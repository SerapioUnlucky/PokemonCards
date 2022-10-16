import React, { useEffect, useState } from 'react';
import Pokemon from './Pokemon';

const App = () => {

  useEffect(() => {
    getAllPokemons()
  }, []);

  const[allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=151');

  const getAllPokemons = async () => {

    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setAllPokemons( currentList => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
        console.log(res);
      });
    };

    createPokemonObject(data.results);

  }

  return (

    <div className="app-container">

      <h1>Pokedex</h1>

      <div className="pokemon-container">

        <div className="all-container">

          {allPokemons.map( (pokemonStats, index) => 
            <Pokemon

              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}

            />)}
          
        </div>
          
      </div>

    </div>

  );
}

export default App;
