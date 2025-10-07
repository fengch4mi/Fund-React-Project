import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { useLocale } from '../hooks/useLocale';

export const NoteDetail = () => {
    const { id } = useParams();
    const { rawNotes, deleteNote, toggleArchive } = useNotes();
    const navigate = useNavigate();

    const note = rawNotes.find(n => String(n.id) === id);

    const { t } = useLocale() || {};

    if (!note) {
        return <div className="portfolio-card"><p>{t ? t('noActive') : 'Catatan Tidak Ditemukan'}</p></div>
    }

    const handleDelete = () => {
        deleteNote(note.id);
        navigate("/");
    };

    const handleArchive = async () => {
        try {
            await toggleArchive(note.id);
        } catch (err) {
            console.error('Archive toggle failed', err);
        }
    };
    
    const handleToggleArchive = () => {
        toggleArchive(note.id);
        navigate("/");
    }

    return (
        <article className="portfolio-card">
            <header>
                <h2>{note.title}</h2>
                <small>{new Date(note.createdAt).toLocaleString()}</small>
            </header>
            <section>
                <p>{note.body}</p>
            </section>
            <div className="note-detail-buttons">
                <button onClick={handleToggleArchive}>
                    {note.archived ? (t ? t('createNew') : 'Pindahkan') : (t ? 'Archive' : 'Arsipkan')}
                </button>
                <button onClick={handleDelete}>{t ? 'Delete' : 'Hapus'}</button>
            </div>
        </article>
    );
};

export default NoteDetail;