import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; 

interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [createError, setCreateError] = useState('');
  const [submitting, setSubmitting] = useState(false);

 const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (err: any) {
      setError('Nem sikerült a projektek betöltése.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSubmitting(true);
    setCreateError('');

    try {
      await api.post('/projects', {
        name: newName,
        description: newDescription
      });
      
      // Sikeres mentés után ürítjük az űrlapot és bezárjuk a modált
      setNewName('');
      setNewDescription('');
      setIsModalOpen(false);
      
      // Frissítjük a listát a backendről
      fetchProjects();
    } catch {
      setCreateError('Nem sikerült a projekt létrehozása. Ellenőrizd a backendet!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* FEJLÉC */}
        <header className="flex justify-between items-center border-b border-slate-700 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-400">Task Manager</h1>
            <p className="text-slate-400 text-sm mt-1">Üdvözlünk a vezetői pulton!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm transition-all active:scale-95"
          >
            Kijelentkezés
          </button>
        </header>

        {/* FŐ TARTALOM */}
        <main>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-200">Saját projektek</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-md shadow-indigo-600/10"
            >
              + Új projekt
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-3 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-800 h-36 rounded-xl border border-slate-700/50"></div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-slate-800 p-12 rounded-xl border border-slate-700 text-center max-w-xl mx-auto mt-8">
              <p className="text-slate-400 mb-4">Még nincsenek létrehozott projektjeid.</p>
              <p className="text-sm text-slate-500">Kattints az "Új projekt" gombra az első elindításához!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg hover:shadow-indigo-950/20 flex flex-col justify-between group"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors mb-2">
                      {project.name}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {project.description || 'Nincs leírás megadva.'}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-4 pt-3 border-t border-slate-700/50">
                    Létrehozva: {project.createdAt ? new Date(project.createdAt).toLocaleDateString('hu-HU') : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* MODÁLIS ABLAK (ÚJ PROJEKT ŰRLAP) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Új projekt indítása</h3>
              
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Projekt neve *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Pl. Webshop Fejlesztés"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Rövid leírás
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Miről szól ez a projekt?"
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                  />
                </div>

                {createError && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    {createError}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setCreateError('');
                    }}
                    className="bg-slate-700 hover:bg-slate-600 border border-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Mégse
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/10"
                  >
                    {submitting ? 'Mentés...' : 'Létrehozás'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}