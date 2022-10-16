const Header = (props) => {
  return (
    <div>
      <h1>{props.data.course}</h1>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises--Total {props.data.exercises1 + props.data.exercises2 + props.data.exercises3}</p>
    </div>
  )
}
 
// const Content = (props) => {
//   return (
//     <div>
//       <p>
//         {props.data.part1} {props.data.exercises1}
//       </p>
//       <p>
//         {props.data.part2} {props.data.exercises2}
//       </p>
//       <p>
//         {props.data.part3} {props.data.exercises3}
//       </p>
//     </div>
//   )
// }
const Content = (props) => {
  return (
    <div>
      <Part part={props.data.part1} exercises={props.data.exercises1} />
      <Part part={props.data.part2} exercises={props.data.exercises2} />
      <Part part={props.data.part3} exercises={props.data.exercises3} />
    </div>
  )
}
const Part = (props) => {
  return (
      <div>
        {props.part} {props.exercises}
      </div>
  )
}
const App = () => {
  const data = {
    course:'Half Stack application development--Header',
    part1:'Fundamentals of React--Content',
    part2:'Using props to pass data--Content',
    part3:'State of a component--Content',
    exercises1:10,
    exercises2:7,
    exercises3:14
  }

  return (
    <div>
      <Header data={data} />
      <Content data={data} />
      <Total data={data} />
    </div>
  )
}

export default App