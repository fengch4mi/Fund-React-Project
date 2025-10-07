import React from "react";
import { NoteList } from "./NoteList";
import { Stats } from "./Stats";
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export const Home = () => {
  const { t } = useLocale() || {};
  return (
    <div className="main-inner">
      <div id="content">
        <article className="portfolio-card">
          <header>
            <h2 className="section-title">{t ? t('notesAppTitle') : 'Aplikasi Catatan'}</h2>
            <p className="post-meta">{t ? t('notesAppDesc') : 'Kelola catatan pribadi kamu di sini'}</p>
          </header>
          <div>
            <div style={{ marginBottom: 12, display: 'flex', gap: 12 }}>
              <Link to="/notes/new" className="button-link">{t ? t('createNew') : 'Buat Catatan Baru'}</Link>
              <span style={{ alignSelf: 'center', color: '#666' }}>{t ? t('orClick') : 'atau klik tombol untuk buka form di halaman terpisah'}</span>
            </div>
            <NoteList />
          </div>
        </article>
      </div>

      <aside>
        <div className="profile-card">
          <h3>{t ? t('stats') : 'Statistik'}</h3>
          <Stats />
        </div>
      </aside>
    </div>
  );
};

export default Home;