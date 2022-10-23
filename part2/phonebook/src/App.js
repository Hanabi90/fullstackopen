/* eslint-disable */
import { useState,useEffect } from 'react'
import {areTheseObjectsEqual} from './tools'
import Filter from "./components/Filter"
import AddNew from "./components/AddNew"
import Notification from "./components/Notification"
import Persons from "./components/Persons"
import nodeServices from './services/node'
const App = () => {
  const [persons, setPersons] = useState([])
  const [contentObj, setContentObj] = useState(null)
  const [personsCopy, setPersonsCopy] = useState([])
  useEffect(()=>{
    nodeServices.getAll().then((newPerson)=>{
      setPersons(persons.concat(newPerson))
      setPersonsCopy(persons.concat(newPerson))
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
  const handleContentObj = function(contentObj){
    setContentObj(contentObj)
    setTimeout(()=>{
      setContentObj(null)
    },1000)
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number:newNumber,
      id:persons.length?persons[persons.length-1].id+1:0
    }
    if(!newName){
      alert(`value can not be empty`)
      return
    }
    if(compare(persons,noteObject)){
      console.log(persons);
      persons.findIndex((i)=>i.name==='3')
      let index = persons.findIndex((i)=>i.name===noteObject.name)
      noteObject.id = persons[index].id
      if (confirm(`${newName} has already added to phonebook,replace the old number with a new one?`)) {
        nodeServices.update(noteObject).then((res)=>{
          console.log(res);
          setPersonsCopy(personsCopy.map((item)=>{
            return item.id===noteObject.id?noteObject:item
          }))
          setPersons(persons.map((item)=>{
            return item.id===noteObject.id?noteObject:item
          }))
          handleContentObj({content:`Information of ${noteObject.name} has been updated`,type:'success'})
        }).catch(()=>{
          handleContentObj({content:`Information of ${noteObject.name} has already been removed from server`,type:'error'})
        })
      }
      return
    }else{
      nodeServices.create(noteObject).then((returnObject)=>{
        setPersons(persons.concat(returnObject))
        setNewName('')
        setNewNumber('')
        let copy = persons.concat(returnObject).filter((item)=>{
          return item.name.toLowerCase().includes(filterValue.toLowerCase())
        })
        setPersonsCopy(copy)
        handleContentObj({content:`Information of ${returnObject.name} has been created`,type:'success'})
      })
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
      <Notification contentObj={contentObj}/>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <h2>add a New</h2>

      <AddNew addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />

      <h2>Numbers</h2>
      
      <Persons personsCopy={personsCopy} setPersonsCopy={setPersonsCopy} setPersons={setPersons} persons={persons} handleContentObj={handleContentObj}/>
    </div>
  )
}

export default App