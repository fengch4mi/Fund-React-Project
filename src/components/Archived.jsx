import React from 'react';
import { useNotes } from '../hooks/useNotes';
import { Note } from './Note';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export const Archived = () => {
  const { rawNotes } = useNotes();
  const { t } = useLocale() || {};
  const archived = rawNotes.filter(n => n.archived);

  return (
    <div className="main-inner">
      <div id="content">
        <article className="portfolio-card">
          <header>
            <h2 className="section-title">{t ? t('archivedNotes') : 'Arsip Catatan'}</h2>
            <p className="post-meta">{t ? t('notesAppDesc') : 'Daftar catatan yang terarsip'}</p>
          </header>

          {archived.length === 0 ? (
            <p className="empty-notes">{t ? t('noArchived') : 'Arsip kosong'}</p>
          ) : (
            <div className="archived-notes">
              {archived.map(note => <Note key={note.id} note={note} />)}
            </div>
          )}

          <p style={{ marginTop: 12 }}><Link to="/">{t ? t('backToList') : 'Kembali ke Daftar'}</Link></p>
        </article>
      </div>

      <aside>
        <div className="profile-card">
          <h3>Statistik</h3>
        </div>
      </aside>
    </div>
  );
};

export default Archived;
