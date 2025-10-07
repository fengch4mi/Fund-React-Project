import React from 'react';
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { getAuthUser } from './utils/storage';
import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';
import { useTheme } from './hooks/useTheme';
import { useLocale } from './hooks/useLocale';
import { useNotes } from './hooks/useNotes';
import Login from './components/Login';
import Register from './components/Register';
import { SearchBar } from './components/SearchBar';
import { Link } from 'react-router-dom';
import Archived from './components/Archived';
import NotFound from './components/NotFound';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { Stats } from './components/Stats';
import { Home } from './components/Home';
import NewNote from './components/NewNote';
import { Route, Routes } from 'react-router-dom';
import { NoteDetail } from './components/NoteDetail';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function AppRoot() {
  const { authUser, logout } = useAuth() || {};
  // fallback to persisted user if context not populated yet
  const persistedUser = getAuthUser();
  const displayUser = authUser || persistedUser || null;
  const { toggleTheme, theme } = useTheme() || {};
  const { t, toggleLocale, locale } = useLocale() || {};
  const auth = useAuth() || {};
  const { loading: notesLoading, notes } = useNotes() || {};

  return (
      <div className="app-root">
        <header>
          <nav className="nav-container">
            <div className="nav-inner" style={{ display: 'flex', gap: 12, padding: '8px 12px' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>{t ? t('home') : 'Home'}</Link>
              <Link to="/archived" style={{ color: 'white', textDecoration: 'none' }}>{t ? t('archived') : 'Arsip'}</Link>
              <Link to="/notes/new" style={{ color: 'white', textDecoration: 'none' }}>{t ? t('newNote') : 'Buat Catatan'}</Link>
              <button onClick={toggleLocale} style={{ background: 'transparent', color: 'white', border: 'none' }}>{locale === 'id' ? 'EN' : 'ID'}</button>
              <button className="theme-toggle" onClick={toggleTheme} style={{ background: 'transparent', color: 'white', border: 'none' }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
              { (auth.accessToken || displayUser) ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="header-avatar" title={(displayUser && (displayUser.name || displayUser.username)) || 'User'}>
                      {(((displayUser && (displayUser.name || displayUser.username)) || 'User').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase())}
                    </div>
                    <span style={{ fontSize: 13, opacity: 0.95 }}>Hi, {(displayUser && (displayUser.name || displayUser.username)) || 'User'}</span>
                    {notesLoading && <span style={{ marginLeft: 8 }}><span className="header-spinner" title="Loading notes" /></span>}
                    <button onClick={logout} style={{ background: 'transparent', color: 'white', border: 'none' }}>Logout</button>
                    <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.9 }}>{auth.accessToken ? '● Authenticated' : '● No Token'}</span>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                  <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Daftar</Link>
                </>
              )}
            </div>
          </nav>
          <div className="header-container">
            <div className="portfolio-subtitle">{t ? t('subtitle') : 'Day-to-day Dairy~'}</div>
            <h1 className="header-title">{t ? t('appTitle') : "Fei's Note!"}</h1>
          </div>
        </header>

        <section className="search-section">
          <div className="search-container">
            <SearchBar />
          </div>
        </section>

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/notes/:id" element={
              <ProtectedRoute>
                <NoteDetail />
              </ProtectedRoute>
            } />

            <Route path="/notes/new" element={
              <ProtectedRoute>
                <NewNote />
              </ProtectedRoute>
            } />

            <Route path="/archived" element={
              <ProtectedRoute>
                <Archived />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; {new Date().getFullYear()} | Dibuat oleh Fei</p>
        </footer>
      </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <NoteProvider>
            <AppRoot />
          </NoteProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}