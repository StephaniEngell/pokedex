import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState({});
  const [searchPokemon, setSearchPokemon] = useState("");
  

  const getPokemons = (id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      const pokemon = response.data;

      setPokemons((prevPokemons) => ({ ...prevPokemons, [id]: pokemon }));
    });
  };

  const arrayPokemons = () =>
    Array(500)
      .fill()
      .map((_, index) => getPokemons(index + 1));

  useEffect(() => {
    arrayPokemons();
  }, []); // eslint-disable-line

  const filteredPokemons = Object.values(pokemons).filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()) || pokemon.id == searchPokemon // eslint-disable-line
  );

  return (
    <div className="container">
      <Navbar onSearch={setSearchPokemon}/>

      <ul className="pokemons">
        {filteredPokemons.map(({ id, name, types }) => (
          <li key={id} className={`card ${types[0].type.name}`}>
            <img
              className="card-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
            />
            <h2>
              {id}. {name}
            </h2>

            <p className="type">
              {types.map((item) => item.type.name).join(" || ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}