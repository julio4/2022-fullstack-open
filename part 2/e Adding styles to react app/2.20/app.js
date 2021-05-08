import React, { useState, useEffect } from "react";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const showError = (message) => {
    setErrorMessage(`An error occured on server. ${message}`);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => {
        showError(`Can't load persons.`);
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (!persons.some((person) => person.name === newName)) {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personsService
        .create(nameObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          showSuccess(`${newName} was added!`);
        })
        .catch((error) => {
          showError(`${newName} was not added.`);
        });
    } else if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const person = persons.find((p) => p.name === newName);
      const updatedPerson = {
        ...person,
        number: newNumber,
      };
      personsService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          setNewName("");
          setNewNumber("");
          showSuccess(`${newName} was updated!`);
        })
        .catch((error) => {
          showError(`${newName} was not updated.`);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const handleDeleteClick = (event) => {
    let person = persons.find((p) => p.name === event.target.value);
    window.confirm(`Delete ${person.name}`) &&
      personsService
        .erase(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          showSuccess(`${event.target.value} was deleted!`);
        })
        .catch((error) => {
          console.log(error);
          showError(
            `${event.target.value} has already been removed from server.`
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
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
      <Notification state={"success"} message={successMessage} />
      <Notification state={"error"} message={errorMessage} />

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

      <Persons list={personsToShow} deleteHandle={handleDeleteClick} />
    </div>
  );
};

export default App;
