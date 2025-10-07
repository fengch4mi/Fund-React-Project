import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export const NotFound = () => {
  const { t } = useLocale() || {};
  return (
    <div className="main-inner">
      <div id="content">
        <article className="portfolio-card">
          <header>
            <h2 className="section-title">404 - {t ? 'Page Not Found' : 'Halaman Tidak Ditemukan'}</h2>
          </header>
          <p>{t ? "Sorry, the page you're looking for doesn't exist." : 'Maaf, halaman yang kamu cari tidak ada.'} Coba kembali ke <Link to="/">{t ? 'home' : 'beranda'}</Link>.</p>
        </article>
      </div>
      <aside>
        <div className="profile-card">
          <h3>{t ? 'Statistics' : 'Statistik'}</h3>
        </div>
      </aside>
    </div>
  );
};

export default NotFound;
