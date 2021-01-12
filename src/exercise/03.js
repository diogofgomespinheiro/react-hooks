// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
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

function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [formData, setFormData] = React.useState({animal: '', name: ''})
  const {animal, name} = formData

  const handleChange = event => {
    const {value, id} = event.target
    setFormData(oldState => ({...oldState, [id]: value}))
  }

  return (
    <form>
      <Name name={name} onNameChange={handleChange} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={handleChange} />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} name={name} />
    </form>
  )
}

export default App
