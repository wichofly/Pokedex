const poke_container = document.getElementById('poke-container')
const pokemon_count = 151
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#FFA069',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#AEE2FF',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

// Getting the colors key as a values to get [0: "fire", 1: "grass"] and so on... works to get number indexes.
// Creating a new array with number index
const main_types = Object.keys(colors)
// console.log(main_types)

// Getting all pokemon by id with for loop
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i)
  }
}

// Async Fetching to get pokemons 
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data)
  // console.log(data)
}

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')

  // the number from img are 001, 002 and so on.
  // The code below helps to place 3 digits number.
  const id = pokemon.id.toString().padStart(3, '0')

  // First letter uppercase
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

  // map to create a new array just with types: we loop through and for each type, i want to return the type object to get the type names.
  // "console.log(pokemon.type)" 
  const poke_types = pokemon.types.map(type => type.type.name)

  // Find the types that match with the main_types(number of list of types) and the name to show it in the pokemon card.
  // console.log(poke_types)
  const type = main_types.find(type => poke_types.indexOf(type) > -1)
  // console.log(type)

  const color = colors[type]

  pokemonEl.style.backgroundColor = color

  const pokemonInnerHTML = `
  <div class="img-container">
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name}">
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `

  pokemonEl.innerHTML = pokemonInnerHTML

  poke_container.appendChild(pokemonEl)
}

fetchPokemons()