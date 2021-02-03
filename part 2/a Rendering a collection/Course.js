import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)
  
const Header = ({ name }) => (
    <h1>{name}</h1> 
)

const Content = ({ parts }) => (
    <>
        {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />  
        )}
    </>
)

const Part = ({name, exercises}) => (
    <p>
        {name} {exercises}
    </p>    
)

const Total = ({parts}) => {
    var totalExercises = parts.reduce((sumOfExercises, part) => {
        return sumOfExercises + part.exercises
    }, 0)
    return (
        <p>
        <strong>
            Total of {totalExercises} exercise{totalExercises > 1 ? 's' : ''}
        </strong>
        </p>
    )
}

export default Course