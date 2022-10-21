import { useState } from 'react'
import Note from './components/Note'
const App = (props) => {
  const [showAll, setShowAll] = useState(true)
  const [notes,setNotes] = useState(props.notes)
  console.log(setShowAll);
  const [newNote, setNewNote] = useState('')
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  console.log(setNotes);
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </form>
    </div>
  )
}

export default App