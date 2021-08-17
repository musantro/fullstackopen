import React, {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '911111111', id: 1}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [queryName, setQueryName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = new Set(persons.map(p => p.name))

    if (names.has(newName)) {
      window.alert(`${newName} has already been saved.`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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
      <div>filter shown with <input value={queryName} onChange={handleQueryChange}/></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number:  <input value={newNumber} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(p => <div key={p.id}>{p.name} {p.number}</div>)}
    </div>
  )
}

export default App;
