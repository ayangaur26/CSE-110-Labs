import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from './themeContext';
import { FormEvent, useContext, useEffect, useState } from 'react';

// App Component
function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const toggleFavorite = (title: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(title)) {
        return prevFavorites.filter(fav => fav !== title);  // Remove from favorites
      } else {
        return [...prevFavorites, title];  // Add to favorites
      }
    });
  };

  useEffect(() => {
    console.log('Favorite notes:', favorites);
  }, [favorites]);

  // Function to create a new note
  function createNoteHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault(); // Prevent form from reloading the page

    // Create a new note object with a unique id
    const newNote: Note = {
      id: notes.length + 1, // Simple way to generate a new id (could use UUID)
      title: createNote.title,
      content: createNote.content,
      label: createNote.label,
    };

    // Add the new note to the notes state
    setNotes((prevNotes) => [...prevNotes, newNote]);

    // Reset the form after submission
    setCreateNote(initialNote);
  }

  const deleteNote = (id: number) => {
    // Get the note to be deleted
    const noteToDelete = notes.find(note => note.id === id);
    
    if (noteToDelete) {
      // Remove the note from the notes list
      setNotes(notes.filter((note) => note.id !== id));
  
      // Also remove the note from the favorites list if it exists there
      setFavorites(favorites.filter(fav => fav !== noteToDelete.title));
    }
  };

  return (
    <div className='app-container'>
      {/* Note Creation Form */}
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required>
          </input>
        </div>

        <div>
          <textarea
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required>
          </textarea>
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      {/* Notes Grid */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
          >
            <div className="notes-header">
              {/* Delete Note */}
              <button onClick={() => deleteNote(note.id)}>x</button>
              
              {/* Toggle Favorite */}
              <button 
                className="favorite-btn" 
                onClick={() => toggleFavorite(note.title)}
                style={{ color: favorites.includes(note.title) ? 'red' : 'black' }}
              >
                {favorites.includes(note.title) ? '❤️' : '♡'}
              </button>
            </div>

            {/* Editable Title and Content */}
            <h2
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => setSelectedNote({ ...note, title: e.target.innerText })}
            >
              {note.title}
            </h2>
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => setSelectedNote({ ...note, content: e.target.innerText })}
            >
              {note.content}
            </p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>

      {/* Displaying Favorite Notes */}
      <div className="favorites">
        <h3>Favorite Notes</h3>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>{fav}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;