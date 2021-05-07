import React, { useState, useEffect } from "react";
import axios from "axios";

//See part 2/ b Forms/ app_2.10/ components
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (!persons.some((person) => person.name === newName)) {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      const request = axios
        .post("http://localhost:3001/persons", nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(`An error occured on server. ${newName} was not added.`);
        });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchName} handler={handleSearchName} />

      <h2>Add a new</h2>

      <PersonForm
        submit={addName}
        name={newName}
        nameHandler={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons list={personsToShow} />
    </div>
  );
};

export default App;
