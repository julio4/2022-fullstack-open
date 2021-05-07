import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course.name}</h1>;

const Content = (props) => (
  <div>
    <Part
      description={props.parts[0].name}
      exercices={props.parts[0].exercises}
    />
    <Part
      description={props.parts[1].name}
      exercices={props.parts[1].exercises}
    />
    <Part
      description={props.parts[2].name}
      exercices={props.parts[2].exercises}
    />
  </div>
);

const Part = (props) => (
  <p>
    {props.description} {props.exercices}
  </p>
);

const Total = (props) => (
  <p>
    Number of exercises 
    {props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
