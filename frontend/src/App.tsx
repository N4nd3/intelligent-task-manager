import React, { useState } from 'react';
import api from './api/axios';
import { AxiosError } from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Sikeres bejelentkezés esetén a backendtől kapott tokent elmentjük
      const receivedToken = response.data.token;
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.status === 403 
          ? 'Hibás e-mail cím vagy jelszó!' 
          : 'Hiba történt a csatlakozás során.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-indigo-400 text-center mb-2">
          Task Manager
        </h1>
        <p className="text-slate-400 text-center mb-6 text-sm">
          {!token ? 'Jelentkezz be a fiókodba' : 'Sikeresen hitelesítve!'}
        </p>

        {!token ? (
          /* BEJELENTKEZŐ ŰRLAP */
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                E-mail cím
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@taskmanager.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Jelszó
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:bg-indigo-800 disabled:scale-100 text-white font-semibold py-2.5 rounded-lg transition-all duration-150 shadow-lg shadow-indigo-600/20"
            >
              {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
            </button>
          </form>
        ) : (
          /* SIKERES BEJELENTKEZÉS UTÁNI NÉZET */
          <div className="text-center space-y-4">
            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-sm p-3 rounded-lg">
              Sikeresen bejelentkeztél! A JWT tokened elmentve a localStorage-ba.
            </div>
            
            <div className="text-left bg-slate-950 p-4 rounded-lg border border-slate-700">
              <span className="block text-xs text-slate-500 font-mono mb-1">TOKEN:</span>
              <p className="text-xs text-indigo-300 font-mono break-all line-clamp-3">
                {token}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-[0.98]"
            >
              Kijelentkezés
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;