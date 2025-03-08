// script.js

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const characteristicContainer = document.getElementById("pokemon-characteristic");
const pokemonStat = document.getElementById("stats");

const fetchData = async () => {
    try {
        const res = await fetch(pokemonAPI);
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

const displayPokemon = () => {};

searchBtn.addEventListener("click", displayPokemon);