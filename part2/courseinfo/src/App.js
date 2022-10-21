import Course  from "./components/Course"
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'redux',
        exercises: 11
      }
    ]
  }
  const course2 = {
    name: 'Node.js',
    parts: [
      {
        name: 'Routing',
        exercises: 3
      },
      {
        name: 'Middlewares',
        exercises: 7
      }
    ]
  }
  return <div><Course course={course} /> <Course course={course2} /></div>
}

export default App