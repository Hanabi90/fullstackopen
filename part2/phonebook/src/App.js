/* eslint-disable */
import { useState,useEffect } from 'react'
import {areTheseObjectsEqual} from './tools'
import Filter from "./components/Filter"
import axios from "axios"
import AddNew from "./components/AddNew"
import Persons from "./components/Persons"
const App = () => {
  const [persons, setPersons] = useState([])
  const [personsCopy, setPersonsCopy] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then((res)=>{
      setPersons(persons.concat(res.data))
      setPersonsCopy(persons.concat(res.data))
    })
  },[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  
  const compare = (arr,obj)=>{
    let bool = false
    for (const item of arr) {
      if (areTheseObjectsEqual(item.name,obj.name)) {
        bool = true
        break
      }
    }
    return bool
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number:newNumber,
      id:persons.length+1
    }
    if(!newName){
      alert(`value can not be empty`)
      return
    }
    if(compare(persons,noteObject)){
      alert(`${newName} has already added to phonebook`)
      return
    }else{
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
      let copy = persons.concat(noteObject).filter((item)=>{
        return item.name.toLowerCase().includes(filterValue.toLowerCase())
      })
      setPersonsCopy(copy)
    }
  }
 const handleFilterChange = (e)=>{
    setFilterValue((v)=>{
      v = e.target.value
      return e.target.value
    })
    let copy = persons.filter((item)=>{
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setPersonsCopy(copy)
  }
  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <h2>add a New</h2>

      <AddNew addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />

      <h2>Numbers</h2>
      
      <Persons personsCopy={personsCopy} />
    </div>
  )
}

export default App