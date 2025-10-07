import { NoteButtons } from './NoteButtons';
import { Link } from 'react-router-dom';

export const Note = ({ note }) => {
  return (
    <div className="note">
      <h3><Link to={`/notes/${note.id}`}>{note.title}</Link></h3>
      <p>{note.body}</p>
      <div className="note-footer">
        <small>{new Date(note.createdAt).toLocaleDateString()}</small>
        <NoteButtons id={note.id} archived={note.archived} />
      </div>
    </div>
  );
};