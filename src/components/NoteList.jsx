import React from 'react';
import { Note } from './Note';
import { useNotes } from '../hooks/useNotes';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export const NoteList = () => {
  const { notes, loading } = useNotes();
  const { accessToken } = useAuth() || {};
  const { t } = useLocale() || {};

  // If there is no authenticated user, show a friendly prompt
  if (!accessToken) {
    return (
      <div className="notes-container">
        <section className="active-section">
          <h2>{t ? t('activeNotes') : 'Catatan Aktif'}</h2>
          <p className="empty-notes">{t ? t('loginPrompt') : <>Silakan <Link to="/login">login</Link> atau <Link to="/register">daftar</Link> untuk melihat catatan Anda.</>}</p>
        </section>
      </div>
    );
  }

  const activeNotes = notes.filter(note => note && !note.archived);
  const archivedNotes = notes.filter(note => note && note.archived);

  return (
    <div className="notes-container">
      {loading && <div className="top-progress" aria-hidden />}
      <section className="active-section">
        <h2>{t ? t('activeNotes') : 'Catatan Aktif'}</h2>
        {loading ? (
          <div className="skeleton-grid">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : activeNotes.length === 0 ? (
          <p className="empty-notes">{t ? t('noActive') : 'Tidak ada catatan aktif'}</p>
        ) : (
          <div className="active-notes">
            {activeNotes.map(note => <Note key={note.id} note={note} />)}
          </div>
        )}
      </section>

      <section className="archived-section">
        <h2>{t ? t('archivedNotes') : 'Catatan Terarsip'}</h2>
        {loading ? (
          <div className="skeleton-grid">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : archivedNotes.length === 0 ? (
          <p className="empty-notes">{t ? t('noArchived') : 'Tidak ada catatan terarsip'}</p>
        ) : (
          <div className="archived-notes">
            {archivedNotes.map(note => <Note key={note.id} note={note} />)}
          </div>
        )}
      </section>
    </div>
  );
};