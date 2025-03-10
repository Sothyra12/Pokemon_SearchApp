// script.js

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonImgAPI =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const characteristicContainer = document.getElementById(
  "pokemon-characteristic"
);

const fetchData = async () => {
  try {
    const res = await fetch(pokemonAPI);
    const data = await res.json();
    displayPokemon(data.results);
  } catch (err) {
    console.error("Error fetching Pokémon data:", err);
  }
};

fetchData();

const displayPokemon = (pokemonList) => {
  characteristicContainer.innerHTML = pokemonList
    .map(({ name, id, weight, height, types }) => {
      return `
            <div class="pokemon">
                <p id="pokemon-name">Name: ${name}</p>
                <p id="pokemon-id"># ${id}</p>
                <p id="weight">Weight: ${weight}</p>
                <p id="height">Height: ${height}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}" />
                <p id="types">Types: ${types
                  .map((type) => type.type.name)
                  .join(", ")}</p>
            </div>
            `;
    })
    .join("");
};

const searchPokemon = async () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  if (!searchValue) return alert("Pokemón not found");

  const formattedSearchValue = searchValue
    .replace(/[^a-z0-9\s♀♂-]/g, "") 
    .replace(/\s+/g, "-") 
    .replace("♀", "-f")
    .replace("♂", "-m");

  try {
    const res = await fetch(`${pokemonAPI}/${formattedSearchValue}/`);
    if (!res.ok) throw new Error("Cannot find Pokémon");

    const pokemonData = await res.json();
    displayPokemon([pokemonData]);
  } catch (err) {
    alert("Pokemón is not found", err);
  }
};

searchBtn.addEventListener("click", searchPokemon);