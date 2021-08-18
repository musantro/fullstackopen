import React, {useEffect, useState} from 'react'
import personService from "./services/persons";
import {Notification} from "./Notification";

const Filter = props => <div>filter shown with <input value={props.value} onChange={props.onChange}/></div>;

const PersonForm = props =>
  <form onSubmit={props.onSubmit}>
    <div>name: <input value={props.value} onChange={props.onChange}/></div>
    <div>number: <input value={props.value1} onChange={props.onChange1}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>;

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [queryName, setQueryName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const deleteHandler = (person) => () => {
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
        .deletePerson(person.id)
        .then(r => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  };

  const addName = (event) => {
    event.preventDefault()
    const names = new Set(persons.map(p => p.name))

    if (names.has(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
          })
          .catch(error => {
            alert(
              `the person ${person.name} was already deleted from server`
            )
            setPersons(persons.filter(p => p.name !== changedPerson.name))
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setSuccessMessage(
            `Added '${returnedPerson.name}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleQueryChange = (event) => {
    setQueryName(event.target.value)
  }

  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(queryName.toLowerCase()))

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={successMessage} />
      <Filter value={queryName} onChange={handleQueryChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addName} value={newName} onChange={handleNameChange} value1={newNumber}
                  onChange1={handlePhoneChange}/>
      <h3>Numbers</h3>
      <div>
        {personsToShow.map(p =>
          <div key={p.id}>
            {p.name} {p.number}
            <button onClick={deleteHandler(p)}>delete</button>
          </div>)}
      </div>
    </div>
  )
}

export default App;
