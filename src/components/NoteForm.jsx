import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export const NoteForm = () => {
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const maxTitleLength = 50;
  const maxBodyLength = 500;
  const { t } = useLocale() || {};
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= maxTitleLength) {
      setTitle(newTitle);
    }
  };

  const handleBodyChange = (e) => {
    const newBody = e.target.value;
    if (newBody.length <= maxBodyLength) {
      setBody(newBody);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      title,
      body,
      archived: false,
    };
    addNote(newNote).then(() => {
      setTitle('');
      setBody('');
      navigate('/');
    }).catch(err => {
      console.error('Failed to create note', err);
    });
  };  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder={t ? t('titlePlaceholder') : 'Judul'}
          value={title}
          onChange={handleTitleChange}
          maxLength={maxTitleLength}
          required
        />
        <small>{maxTitleLength - title.length} karakter tersisa</small>
      </div>
      <div>
        <textarea
          placeholder={t ? t('bodyPlaceholder') : 'Isi catatan'}
          value={body}
          onChange={handleBodyChange}
          maxLength={maxBodyLength}
          required
        />
        <small>{maxBodyLength - body.length} karakter tersisa</small>
      </div>
      <button type="submit">{t ? t('save') : 'Simpan'}</button>
    </form>
  );
};