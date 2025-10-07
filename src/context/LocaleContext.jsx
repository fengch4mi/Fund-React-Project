import React, { createContext, useState, useEffect } from 'react';

const LOCALE_KEY = 'locale';

export const LocaleContext = createContext();

const translations = {
  en: {
    home: 'Home',
    archived: 'Archived',
    newNote: 'New Note',
    login: 'Login',
    register: 'Register',
    appTitle: "Fei's Note!",
    subtitle: 'Day-to-day Diary~',
    notesAppTitle: 'Notes App',
    notesAppDesc: 'Manage your personal notes here',
    createNew: 'Create New Note',
    orClick: 'or click the button to open the form on a separate page',
    stats: 'Statistics',
    activeNotes: 'Active Notes',
    archivedNotes: 'Archived Notes',
    noActive: 'No active notes',
    noArchived: 'No archived notes',
    titlePlaceholder: 'Title',
    bodyPlaceholder: 'Note body',
    save: 'Save',
    loginPrompt: 'Please login or register to see your notes.',
    backToList: 'Back to List',
    searchPlaceholder: 'Search notes...',
  },
  id: {
    home: 'Home',
    archived: 'Arsip',
    newNote: 'Buat Catatan',
    login: 'Login',
    register: 'Daftar',
    appTitle: "Fei's Note!",
    subtitle: 'Day-to-day Diary~',
    notesAppTitle: 'Aplikasi Catatan',
    notesAppDesc: 'Kelola catatan pribadi kamu di sini',
    createNew: 'Buat Catatan Baru',
    orClick: 'atau klik tombol untuk buka form di halaman terpisah',
    stats: 'Statistik',
    activeNotes: 'Catatan Aktif',
    archivedNotes: 'Catatan Terarsip',
    noActive: 'Tidak ada catatan aktif',
    noArchived: 'Tidak ada catatan terarsip',
    titlePlaceholder: 'Judul',
    bodyPlaceholder: 'Isi catatan',
    save: 'Simpan',
    loginPrompt: 'Silakan login atau daftar untuk melihat catatan Anda.',
    backToList: 'Kembali ke Daftar',
    searchPlaceholder: 'Cari catatan...',
  }
};

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    try {
      const v = localStorage.getItem(LOCALE_KEY);
      return v || 'id';
    } catch (e) {
      return 'id';
    }
  });

  useEffect(() => {
    try { localStorage.setItem(LOCALE_KEY, locale); } catch (e) {}
  }, [locale]);

  const t = (key) => translations[locale][key] || key;

  const toggleLocale = () => setLocale(l => (l === 'id' ? 'en' : 'id'));

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
