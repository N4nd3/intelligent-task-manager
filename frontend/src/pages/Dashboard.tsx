import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  //const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center border-b border-slate-700 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-400">Task Manager</h1>
            <p className="text-slate-400 text-sm mt-1">Üdvözlünk a vezetői pulton!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm transition-all"
          >
            Kijelentkezés
          </button>
        </header>

        <main className="grid gap-6 md:grid-cols-2">
          {/* Ide jönnek majd a projektek és feladatok */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-2 text-indigo-300">Saját projektek</h2>
            <p className="text-slate-400 text-sm">Hamarosan itt jelennek meg a projektjeid...</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-2 text-indigo-300">Aktív feladatok</h2>
            <p className="text-slate-400 text-sm">Hamarosan itt követheted a feladataidat...</p>
          </div>
        </main>
      </div>
    </div>
  );
}