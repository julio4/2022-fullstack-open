import React from "react";

const Persons = ({ list, deleteHandle }) =>
  list.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button value={person.name} onClick={deleteHandle}>
        delete
      </button>
    </p>
  ));

export default Persons;
