import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/node'
const App = () => {
  const [count, setCount] = useState(0);
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     date: new Date().toISOString(),
  //     important: Math.random() < 0.5,
  //     id: notes.length + 1,
  //   }
  
  //   setNotes(notes.concat(noteObject))
  //   setNewNote('')
  // }
  
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }
  
    noteService
    .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
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
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  return (
    <div>
      <h1>Notes</h1>
      <p>You clicked {count} times</p>
      <button onClick={test}>测试</button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={()=>{
            toggleImportanceOf(note.id)
          }} />
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