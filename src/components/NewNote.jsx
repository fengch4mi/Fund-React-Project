import React from 'react';
import { NoteForm } from './NoteForm';
import { Link } from 'react-router-dom';

export const NewNote = () => {
  return (
    <div className="main-inner">
      <div id="content">
        <article className="portfolio-card">
          <header>
            <h2 className="section-title">Buat Catatan Baru</h2>
            <p className="post-meta">Isi form di bawah untuk menambahkan catatan baru.</p>
          </header>
          <div>
            <NoteForm />
            <p style={{ marginTop: '12px' }}><Link to={"/"}>Kembali ke Daftar</Link></p>
          </div>
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

export default NewNote;
