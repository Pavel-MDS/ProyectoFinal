// src/routes/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredTipo }) {
  const { tipo } = useContext(AuthContext);

  if (!tipo) {
    return <Navigate to="/registro" replace />;
  }
  if (requiredTipo && tipo !== requiredTipo) {
    return <Navigate to="/" replace />;
  }
  return children;
}
