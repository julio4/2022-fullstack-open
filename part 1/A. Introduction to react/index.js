import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course.title}</h1>
)

const Part = (props) => (
  <p>{props.description} {props.exercices}</p>
)

const Content = (course) => {
  return (
    <div>
      <Part description={course.parts[0].description} exercices={course.parts[0].exercices} />
      <Part description={course.parts[1].description} exercices={course.parts[1].exercices} />
      <Part description={course.parts[2].description} exercices={course.parts[2].exercices} />
    </div>
  )
}

const Total = (course) => (
    <p>Number of exercices 
      {
      course.parts[0].exercices +
      course.parts[1].exercices +
      course.parts[2].exercices
      }
    </p>
)

const App = () => {
  const course = {
    title : 'Half Stack application development',
    parts : [
      {
        description : 'Fundamentals of React',
        exercices : 10
      },
      {
        description : 'Using props to pass data',
        exercices : 7
      },
      {
        description : 'State of a component',
        exercices : 14
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