import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const auth = useAuth() || {};
  const { accessToken } = auth;

  // while auth is initializing, don't redirect — wait for the auth state to settle
  if (auth.initializing) {
    return null; // or a spinner if you prefer
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
