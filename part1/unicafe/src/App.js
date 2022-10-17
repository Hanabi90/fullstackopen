import { useState } from 'react'
const Button = ({handleClick,text}) => {
  return (
    <div>
      <button style={{background:"#fff",border: '1px solid #b5b5b5','borderRadius':'4px'}} onClick={handleClick}>{text}</button>
    </div>
  )
}
const StatisticLine = ({text,value}) => {
  return (
    <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </tbody>
  )
}
const Statistics = ({data}) => {
  const {good,neutral,bad} = {...data}
  let temp1 = (good-bad)/(good+neutral+bad)
  let temp2 = good/(good+neutral+bad)
  const average = temp1?temp1:0
  const postive = temp2?temp2+'%':0
  if (good+neutral+bad) {
    return (
      <div>
        <table>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={good+neutral+bad}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='postive' value={postive}/>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setValue = function(fn,value){
    return ()=>{
      fn(value+1)
    }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <div style={{display:"flex",width:'160px','justifyContent':'space-between'}}>
        <Button text='good' handleClick={setValue(setGood,good)}/>
        <Button text='neutral' handleClick={setValue(setNeutral,neutral)}/>
        <Button text='bad' handleClick={setValue(setBad,bad)}/>
      </div>
      <h1>Statistics</h1>
      <Statistics data={{good,neutral,bad}} />
    </div>
  )
}

export default App