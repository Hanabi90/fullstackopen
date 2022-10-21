const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}
const Total = ({course}) => {
  return (
    <div>
      <h3>total of<span style={{display:'inlineBlock',margin:'4px'}}>
      {course.parts.reduce((a,b)=>{
          return a+b.exercises
      },0)}
      </span>
      exercises
      </h3> 
    </div>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map((part)=>{
        return <Part key={part.name} part={part.name} exercises={part.exercises} />
      })}
    </div>
  )
}
const Part = ({part,exercises}) => {
  return (
      <div>
        {part} {exercises}
      </div>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}
export default Course