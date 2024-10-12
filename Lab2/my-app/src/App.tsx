import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from './themeContext';
import { FormEvent, useContext, useEffect, useState } from 'react';


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

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleFavorite = (title: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(title)) {
        return prevFavorites.filter(fav => fav !== title);
      } else {
        return [...prevFavorites, title];
      }
    });
  };

  useEffect(() => {
    console.log('Favorite notes:', favorites);
  }, [favorites]);

  
  function createNoteHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: createNote.title,
      content: createNote.content,
      label: createNote.label,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCreateNote(initialNote);
  }

  const deleteNote = (id: number) => {
    const noteToDelete = notes.find(note => note.id === id);
    
    if (noteToDelete) {
      setNotes(notes.filter((note) => note.id !== id));
      setFavorites(favorites.filter(fav => fav !== noteToDelete.title));
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className={`app-container ${currentTheme === themes.light ? 'light' : 'dark'}`}>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Toggle Theme
        </button>
        
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required
            />
          </div>

          <div>
            <textarea
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required
            />
          </div>

          <div>
            <select
              value={createNote.label}
              onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as Label })}
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div><button type="submit">Create Note</button></div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className={`note-item ${currentTheme === themes.light ? 'light' : 'dark'}`}>
              <div className="notes-header">
                <button onClick={() => deleteNote(note.id)}>x</button>
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(note.title)}
                  style={{ color: favorites.includes(note.title) ? 'red' : 'black' }}
                >
                  {favorites.includes(note.title) ? '❤️' : '♡'}
                </button>
              </div>
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
    </ThemeContext.Provider>
  );
}

export default App;