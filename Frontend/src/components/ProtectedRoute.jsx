import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  const isAuthenticated = token || adminToken;

  console.log('ProtectedRoute: token', token);
  console.log('ProtectedRoute: adminToken', adminToken);
  console.log('ProtectedRoute: isAuthenticated', isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;