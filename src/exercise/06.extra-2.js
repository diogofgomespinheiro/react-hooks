// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm} from '../pokemon'

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

function compareStatus(status, key) {
  return status === key
}

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = React.useState(STATUS.idle)
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) return

    setStatus(STATUS.pending)
    setPokemon(null)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setStatus(STATUS.resolved)
        setPokemon(pokemonData)
      })
      .catch(error => {
        setStatus(STATUS.rejected)
        setError(error)
      })
  }, [pokemonName])

  if (compareStatus(status, STATUS.idle)) return 'Submit a pokemon'

  if (compareStatus(status, STATUS.error))
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )

  if (compareStatus(status, STATUS.pending))
    return <PokemonInfoFallback name={pokemonName} />

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
