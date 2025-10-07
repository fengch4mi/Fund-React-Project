import { useNotes } from '../hooks/useNotes';
import { useLocale } from '../hooks/useLocale';

export const NoteButtons = ({ id, archived }) => {
  const { deleteNote, toggleArchive } = useNotes();
  const { t } = useLocale() || {};

  const handleArchive = async () => {
    try {
      await toggleArchive(id);
    } catch (err) {
      console.error('Archive error', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t ? 'Are you sure to delete this note?' : 'Yakin ingin menghapus catatan ini?')) return;
    try {
      await deleteNote(id);
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  return (
    <div className="note-buttons">
      <button onClick={handleArchive}>
        {archived ? (t ? 'Move' : 'Pindahkan') : (t ? 'Archive' : 'Arsipkan')}
      </button>
      <button onClick={handleDelete}>{t ? 'Delete' : 'Hapus'}</button>
    </div>
  );
};
