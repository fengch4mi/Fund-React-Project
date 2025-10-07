import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const DEFAULT = {
  notes: [],
  rawNotes: [],
  loading: false,
  addNote: async () => { throw new Error('No NoteProvider'); },
  deleteNote: async () => { throw new Error('No NoteProvider'); },
  toggleArchive: async () => { throw new Error('No NoteProvider'); },
  searchKeyword: '',
  setSearchKeyword: () => {},
};

export const useNotes = () => {
  return useContext(NoteContext) || DEFAULT;
};