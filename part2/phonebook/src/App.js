import React, {useEffect, useState} from 'react'
import personService from "./services/persons";

const Filter = props => <div>filter shown with <input value={props.value} onChange={props.onChange}/></div>;

const PersonForm = props =>
  <form onSubmit={props.onSubmit}>
    <div>name: <input value={props.value} onChange={props.onChange}/></div>
    <div>number: <input value={props.value1} onChange={props.onChange1}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>;

const Persons = props => <>{props.personsToShow.map(p => <div key={p.id}>{p.name} {p.number}</div>)}</>;

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [queryName, setQueryName] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const names = new Set(persons.map(p => p.name))

    if (names.has(newName)) {
      window.alert(`${newName} has already been saved.`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
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
      <Filter value={queryName} onChange={handleQueryChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addName} value={newName} onChange={handleNameChange} value1={newNumber}
                  onChange1={handlePhoneChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App;
