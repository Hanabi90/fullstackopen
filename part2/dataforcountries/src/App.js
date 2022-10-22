/* eslint-disable */
import { useState,useEffect } from 'react'
import Filter from "./components/Filter"
import Countries from "./components/Countries"
import axios from "axios"
const App = () => {
  const [countries, setCountries] = useState([{name:{common:'wait...'}}])
  const [countriesCopy, setCountriesCopy] = useState([{name:{common:'wait...'}}])
  const [filterValue, setFilterValue] = useState('')
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then((res)=>{
      setCountries(res.data)
      setCountriesCopy(res.data)
    })
  },[])
 const handleFilterChange = (e)=>{
    setFilterValue((v)=>{
      v = e.target.value
      return e.target.value
    })
    let copy = countries.filter((item)=>{
      return item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setCountriesCopy(copy)
  }
  return (
    <div>
      <h2>Country Finder</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <Countries countriesCopy={countriesCopy} setCountriesCopy={setCountriesCopy}/>
    </div>
  )
}

export default App