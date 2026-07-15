import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // Ha nincs token, visszadobjuk a /login-ra, különben mehet a belső tartalom (Outlet)
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}