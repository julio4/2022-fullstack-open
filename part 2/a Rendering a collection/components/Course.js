import React from 'react'

const Header = ({ course }) => (
  <h1>{course.name}</h1>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ course }) => (
  <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />  
      )}
  </div>
)

const Total = ({ course }) => {
  const sum = course.parts.reduce((sumOfExercises, part) => {
    return sumOfExercises + part.exercises
  }, 0)
  
  return (
    <strong>Number of exercises {sum}</strong>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

export default Course