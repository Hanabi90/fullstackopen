import { useState } from 'react'
const Button = ({handleClick,value}) => {
  return (
    <div>
      <button onClick={handleClick}>按钮</button>
      <p>{value}</p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setValue = function(fn,value){
    fn(value+1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setValue()} value={good} />
      <Button handleClick={()=>{setNeutral(neutral+1)}} value={neutral} />
      <Button handleClick={()=>{setBad(bad+1)}} value={bad} />
    </div>
  )
}

export default App