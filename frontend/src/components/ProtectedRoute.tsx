import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token'); // Vérifie si le token est présent
  return token ? children : <Navigate to="/login" />; // Redirige si non connecté
};

export default ProtectedRoute;
