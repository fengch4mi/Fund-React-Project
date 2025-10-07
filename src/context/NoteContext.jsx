import { createContext, useState, useEffect } from 'react';
import * as notesApi from '../services/notesApi';
import { useAuth } from '../hooks/useAuth';
import { clearAccessToken } from '../utils/storage';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { accessToken } = useAuth() || {};
  const [rawNotes, setRawNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!accessToken) {
        setRawNotes([]);
        return;
      }
      setLoading(true);
      try {
        const notes = await notesApi.getAllNotes(accessToken);
        // Normalize incoming notes and filter out invalid entries
        const normalized = (Array.isArray(notes) ? notes : []).map(n => normalizeNote(n)).filter(Boolean);
        setRawNotes(normalized);
      } catch (err) {
        console.error('Failed to load notes', err);
        setRawNotes([]);
        if (err && err.status === 401) {
          // token invalid or expired -> clear stored token and redirect to login
          try { clearAccessToken(); } catch(e){}
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [accessToken]);

  const addNote = async (note) => {
    if (!accessToken) throw new Error('Not authenticated');
    // Remove 'archived' property if present
    const { archived, ...notePayload } = note;
    setLoading(true);
    try {
      const created = await notesApi.createNote(notePayload, accessToken);
      // Normalize created note before adding
      const normalized = normalizeNote(created);
      if (normalized) setRawNotes(prev => [...prev, normalized]);
      return created;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!accessToken) throw new Error('Not authenticated');
    setLoading(true);
    try {
      await notesApi.deleteNote(id, accessToken);
      setRawNotes(prev => prev.filter(n => String(n.id) !== String(id)));
    } finally {
      setLoading(false);
    }
  };

  const toggleArchive = async (id) => {
    if (!accessToken) throw new Error('Not authenticated');
    const note = rawNotes.find(n => String(n.id) === String(id));
    if (!note) return;

    // Optimistic update: toggle locally first
    const toggled = { ...note, archived: !note.archived };
    setRawNotes(prev => prev.map(n => String(n.id) === String(id) ? toggled : n));

    setLoading(true);

    try {
      let updated;
      if (note.archived) {
        updated = await notesApi.unarchiveNote(id, accessToken);
      } else {
        updated = await notesApi.archiveNote(id, accessToken);
      }
      const normalized = normalizeNote(updated);
      if (normalized) {
        setRawNotes(prev => prev.map(n => String(n.id) === String(id) ? normalized : n));
      }
      // if normalized is null, keep optimistic change
    } catch (err) {
      // Revert optimistic change on error
      setRawNotes(prev => prev.map(n => String(n.id) === String(id) ? note : n));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Helper to normalize/validate note objects coming from API or elsewhere
  function normalizeNote(n) {
    if (!n || typeof n !== 'object') return null;
    // unwrap common response wrappers: { data: { note: {...} } } or { data: {...} }
    let item = n;
    if (n.data && typeof n.data === 'object') {
      item = n.data.note ?? n.data;
    } else if (n.note && typeof n.note === 'object') {
      item = n.note;
    }
    if (!item || typeof item !== 'object') return null;
    const id = item.id ?? item._id ?? null;
    const title = typeof item.title === 'string' ? item.title : '';
    const body = typeof item.body === 'string' ? item.body : '';
    const archived = Boolean(item.archived);
    const createdAt = item.createdAt || item.created_at || '';
    if (id == null) return null;
    return { id, title, body, archived, createdAt };
  }

  const getFilteredNotes = () => {
    if (!searchKeyword) return rawNotes.filter(Boolean);
    return rawNotes
      .filter(Boolean)
      .filter(note => typeof note.title === 'string' && note.title.toLowerCase().includes(searchKeyword.toLowerCase()));
  };

  return (
    <NoteContext.Provider value={{
      notes: getFilteredNotes(),
      rawNotes,
      loading,
      addNote,
      deleteNote,
      toggleArchive,
      searchKeyword,
      setSearchKeyword,
    }}>
      {children}
    </NoteContext.Provider>
  );
};