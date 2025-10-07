import React, { createContext, useState, useEffect } from 'react';
import * as notesApi from '../services/notesApi';
import { putAccessToken, getAccessToken, clearAccessToken, putAuthUser, getAuthUser, clearAuthUser } from '../utils/storage';

export const AuthContext = createContext();

// Safely parse a JWT and return its payload, or null on failure
function parseJwt(token) {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length < 2) return null;
    // base64url -> base64
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    // decode base64
    const json = decodeURIComponent(atob(b64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // read token from storage on mount
    const token = getAccessToken();
    const user = getAuthUser();
    if (token) setAccessToken(token);
    if (user) setAuthUser(user);
    else if (token) {
      // try to parse token for user info as a fallback
      const parsed = parseJwt(token);
      if (parsed) {
        const pUser = { name: parsed.name || parsed.username || '', email: parsed.email || '' };
        setAuthUser(pUser);
        putAuthUser(pUser);
      }
    }
    setInitializing(false);
  }, []);

  const register = async ({ name, email, password }) => {
    try {
      const res = await notesApi.register({ name, email, password });
  const token = res?.data?.token || res?.data?.accessToken || res?.token || res?.accessToken || null;
      if (token) {
        putAccessToken(token);
        setAccessToken(token);
      }
      let user = res?.data?.user || res?.user || null;
      // fallback to provided name if API does not return a user object
      if (!user && name) {
        user = { name, email };
      }
      // final fallback: parse token for user info
      if (!user) {
        const parsed = parseJwt(token);
        if (parsed) user = { name: parsed.name || parsed.username || '', email: parsed.email || '' };
      }
      if (user) {
        setAuthUser(user);
        putAuthUser(user);
      }
      return res;
    } catch (err) {
      console.error('Register error', err);
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await notesApi.login({ email, password });
  const token = res?.data?.token || res?.data?.accessToken || res?.token || res?.accessToken || null;
      if (token) {
        putAccessToken(token);
        setAccessToken(token);
      }
      let user = res?.data?.user || res?.user || null;
      // if API didn't return user, attempt to reuse stored authUser
      if (!user) {
        const stored = getAuthUser();
        if (stored && stored.email === email) user = stored;
      }
      // final fallback: try to parse token
      if (!user && token) {
        const parsed = parseJwt(token);
        if (parsed) user = { name: parsed.name || parsed.username || '', email: parsed.email || '' };
      }
      if (user) {
        setAuthUser(user);
        putAuthUser(user);
      }
      return res;
    } catch (err) {
      console.error('Login error', err);
      throw err;
    }
  };

  const logout = () => {
    clearAccessToken();
    setAccessToken(null);
    setAuthUser(null);
    clearAuthUser();
  };

  return (
    <AuthContext.Provider value={{ authUser, accessToken, initializing, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
