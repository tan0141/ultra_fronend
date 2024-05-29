import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
