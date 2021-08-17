import React, {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', id: 1}
  ])
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const names = new Set(persons.map(p => p.name))

    if (names.has(newName)) {
      window.alert(`${newName} has already been saved.`)
    }
    else {
      const nameObject = {
        name: newName,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  )
}

export default App;
