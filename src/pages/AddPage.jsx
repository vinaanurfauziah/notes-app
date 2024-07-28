import React from 'react';
<<<<<<< HEAD
import { addNote } from '../utils/local-data';
=======
import { addNote } from '../utils/api';
>>>>>>> abdc32465860646d24aeae44de87b528b2646916
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate('/');
  }

  return (
    <section>
      <h2>Tambah catatan</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
