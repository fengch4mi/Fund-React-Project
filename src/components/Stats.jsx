import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useLocale } from '../hooks/useLocale';

export const Stats = () => {
  const { rawNotes } = useNotes();
  const safeNotes = Array.isArray(rawNotes) ? rawNotes.filter(Boolean) : [];
  const total = safeNotes.length;
  const active = safeNotes.filter(n => !n.archived).length;
  const archived = total - active;
  const [open, setOpen] = useState(true);
  const { t } = useLocale() || {};

  return (
    <div className="stats">
      <button
        className="stats-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {open ? (t ? 'Hide Statistics' : 'Sembunyikan Statistik') : (t ? 'Show Statistics' : 'Tampilkan Statistik')}
      </button>

      {open && (
        <div className="stats-body">
          <p>{t ? 'Total notes:' : 'Total catatan:'} <strong>{total}</strong></p>
          <p>{t ? 'Active:' : 'Aktif:'} <strong>{active}</strong></p>
          <p>{t ? 'Archived:' : 'Terarsip:'} <strong>{archived}</strong></p>
        </div>
      )}
    </div>
  );
};
