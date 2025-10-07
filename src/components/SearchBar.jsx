import React, { useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useSearchParams } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export const SearchBar = () => {
  const { searchKeyword, setSearchKeyword } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLocale() || {};

  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== searchKeyword) setSearchKeyword(q);
  }, [searchParams]);

  const handleChange = (e) => {
    const v = e.target.value;
    setSearchKeyword(v);
    if (v) setSearchParams({ q: v });
    else setSearchParams({});
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t ? t('searchPlaceholder') : 'Cari catatan...'}
        value={searchKeyword}
        onChange={handleChange}
      />
    </div>
  );
};