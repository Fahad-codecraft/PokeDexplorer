const POKEMON_URL = "https://pokeapi.co/api/v2/"

export async function getPokemonData(offset) {
  const response = await fetch(`${POKEMON_URL}pokemon?offset=${offset}&limit=20`, { next: { revalidate: 60 } });
  const data = await response.json();
  const pokemons = [];

  if (data.results) {
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      // console.log(pokemonData)
      pokemons.push(pokemonData);
    }
  }
  // console.log(pokemons)
  return pokemons;
}

export const realTimeSearch = async() => {
  const response = await fetch(`${POKEMON_URL}pokemon?limit=100000&offset=0`, { next: { revalidate: 60 } })
  const data = await response.json()
  return data.results
}

export async function getPokemon(name) {
  const response = await fetch(POKEMON_URL + `pokemon/${name}`, { next: { revalidate: 60 } });
  const data = await response.json();
  return data
}

export async function getPokemonById (id) {
  const response = await fetch(POKEMON_URL + `pokemon/${id}`, { next: { revalidate: 60 } });
  const data = await response.json();
  return data
}
