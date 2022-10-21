import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'
console.log('111');
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2.then((res)=>{
console.log(res);
}))
ReactDOM.createRoot(document.getElementById('root')).render(<App />)