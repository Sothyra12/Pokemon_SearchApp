// script.js

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const characteristicContainer = document.getElementById("pokemon-characteristic");
const pokemonStat = document.querySelectorAll("tbody td");

let pokemonData = [];

const fetchData = async () => {
    try {
        const res = await fetch(pokemonAPI);
        const data = await res.json();
        pokemonData = data.results;
        displayPokemon(pokemonData); // Display all Pokémon data
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

fetchData();

const displayPokemon = (data) => {
    characteristicContainer.innerHTML = data
        .map(item => {
            const {
                name,
                id,
                weight,
                height,
                types,
            } = item;

            return `
                <p id="pokemon-name-${id}">Name: ${name}</p>
                <p id="pokemon-id-${id}"># ${id}</p>
                <p id="weight-${id}">Weight: ${weight}</p>
                <p id="height-${id}">Height: ${height}</p>
                <p id="types-${id}">${types ? types.map(t => t.type.name).join(', ') : 'No types available'}</p>
            `;
        })
    .join("");
};

const searchPokemon = () => {
    if (!pokemonData || pokemonData.length === 0) {
        return alert("No data available to search!");
    }

    const searchValueStr = String(searchInput.value).toLowerCase();
    const searchValueNum = Number(searchInput.value);
    
    const foundPokemon = pokemonData.find((item) => {
        const { id, name } = item;
        return id === searchValueNum || name.toLowerCase() === searchValueStr;
    });

    if (foundPokemon) {
        displayPokemon([foundPokemon]); // Display the found Pokémon
    } else {
        alert("Pokemon not found!");
    }
};

searchBtn.addEventListener("click", searchPokemon);