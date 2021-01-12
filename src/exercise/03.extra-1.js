// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [formData, setFormData] = React.useState({animal: ''})
  const {animal} = formData

  const handleChange = event => {
    const {value, id} = event.target
    setFormData(oldState => ({...oldState, [id]: value}))
  }

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={handleChange} />
      <Display animal={animal} />
    </form>
  )
}

export default App
