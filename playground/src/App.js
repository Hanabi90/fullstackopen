import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
const App = () => {
  const [count, setCount] = useState(0);
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  const handleNoteChange = (event) => {
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
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    // console.log(count);
  });
  const test = ()=>{
    setCount((a)=>{
      return a = a+1
    })
    console.log(count);
  }
  return (
    <div>
      <h1>Notes</h1>
      <p>You clicked {count} times</p>
      <button onClick={test}>测试</button>
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