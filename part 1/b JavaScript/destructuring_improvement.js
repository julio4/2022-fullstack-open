import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({parts}) => (
  <>
    <Part description={parts[0].name} exercices={parts[0].exercises} />
    <Part description={parts[1].name} exercices={parts[1].exercises} />
    <Part description={parts[2].name} exercices={parts[2].exercises} />
  </>
)

const Part = ({description, exercices}) => <p>{description} {exercices}</p>

const Total = ({parts}) => {
  let exercisesSum = 0
  parts.forEach(part => {
    exercisesSum += part.exercises 
  })
  return <p>Number of exercises {exercisesSum}</p>
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of React',
        exercises : 10
      },
      {
        name : 'Using props to pass data',
        exercises : 7
      },
      {
        name : 'State of a component',
        exercises : 14
      } 
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))