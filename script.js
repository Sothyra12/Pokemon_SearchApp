// script.js

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonImgAPI =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const fetchData = async () => {
  try {
    const res = await fetch(pokemonAPI);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      console.error("No Pokémon data found");
      return;
    }

    displayPokemon(data.results);
  } catch (err) {
    console.error("Error fetching Pokémon data:", err);
  }
};

fetchData();

const updatePokemonValue = (id, val) => {
  const [label, ...rest] = val.includes(":") ? val.split(" ") : [val, ""];
  document.getElementById(
    id
  ).innerHTML = `<strong>${label}</strong> ${rest.join(":")}`;
};

const displayPokemon = (pokemonList) => {
  if (!pokemonList || pokemonList.length === 0 || !pokemonList[0]) {
    alert("Pokémon not found");
    return;
  }

  const { name, id, height, weight, types, stats } = pokemonList[0];

  updatePokemonValue("pokemon-name", `Name: ${name}`);
  updatePokemonValue("pokemon-id", `# ${id}`);
  updatePokemonValue("weight", `Weight: ${weight}`);
  updatePokemonValue("height", `Height: ${height}`);
  document.getElementById("pokemon-image").src = `${pokemonImgAPI}/${id}.png`;
  updatePokemonValue("types", `${types?.[0]?.type?.name || "Unknown"}`);
  updatePokemonValue("hp", `${stats?.[0]?.base_stat || "Unknown"}`);
  updatePokemonValue("attack", `${stats?.[1]?.base_stat || "Unknown"}`);
  updatePokemonValue("defense", `${stats?.[2]?.base_stat || "Unknown"}`);
  updatePokemonValue("sp-attack", `${stats?.[3]?.base_stat || "Unknown"}`);
  updatePokemonValue("sp-defense", `${stats?.[4]?.base_stat || "Unknown"}`);
  updatePokemonValue("speed", `${stats?.[5]?.base_stat || "Unknown"}`);
};

const searchPokemon = async () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  if (!searchValue) return alert("Pokémon not found");

  const formattedSearchValue = searchValue
    .replace(/[^a-z0-9\s♀♂-]/g, "")
    .replace(/\s+/g, "-")
    .replace("♀", "-f")
    .replace("♂", "-m");

  try {
    const res = await fetch(`${pokemonAPI}/${formattedSearchValue}/`);
    if (!res.ok) throw new Error("Cannot find Pokémon");

    const pokemonData = await res.json();
    if (!pokemonData || Object.keys(pokemonData).length === 0) {
      throw new Error("Invalid Pokémon data");
    }

    displayPokemon([pokemonData]);
  } catch (err) {
    alert("Pokémon not found: " + err.message);
  }
};

searchBtn.addEventListener("click", searchPokemon);