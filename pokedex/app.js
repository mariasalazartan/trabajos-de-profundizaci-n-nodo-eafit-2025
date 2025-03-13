// Mapeo de tipos de Pokémon a colores de fondo
const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
};

document.body.style.background = "url('https://wallpapercave.com/wp/wp3170170.jpg') no-repeat center center fixed";
document.body.style.backgroundSize = "100% 100%";
document.body.style.color = "white";
document.body.style.fontFamily = "'Press Start 2P', cursive";
document.head.innerHTML += `<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">`;

document.addEventListener("DOMContentLoaded", fetchPokemonList);

async function fetchPokemonList() {
    const pokemonList = document.getElementById("pokemonList");
    pokemonList.innerHTML = `<div class='loading text-center text-white text-xl py-6'>Cargando Pokémon...</div>`;
    
    try {
        const promises = [];
        for (let i = 1; i <= 1010; i++) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()));
        }
        
        const allPokemon = await Promise.all(promises);
        allPokemon.forEach((pokemon) => createPokemonCard(pokemon));
        document.querySelector(".loading")?.remove();
    } catch (error) {
        console.error("Error al obtener Pokémon:", error);
        pokemonList.innerHTML = `<div class='error text-center text-red-400 text-xl py-6'>Error al cargar los Pokémon. Intenta recargar la página.</div>`;
    }
}

function createPokemonCard(pokemon) {
    const pokemonList = document.getElementById("pokemonList");
    const mainType = pokemon.types[0].type.name;
    const cardColor = typeColors[mainType] || "#A8A878";

    const card = document.createElement("div");
    card.className = "pokemon-card shadow-lg transform transition-transform hover:scale-105 p-4 rounded-lg text-center text-black relative overflow-visible mb-16";
    card.style.backgroundColor = cardColor;
    card.setAttribute("data-name", pokemon.name);
    card.onclick = () => card.classList.toggle("flipped");
    
    const img = document.createElement("img");
    img.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    img.alt = pokemon.name;
    img.className = "w-32 mx-auto absolute -top-12 left-1/2 transform -translate-x-1/2";
    
    card.innerHTML = `
        <div class="front pt-10">
            <h2 class="text-2xl font-bold capitalize text-black tracking-wide drop-shadow-md">${pokemon.name}</h2>
            <div class="mt-1 flex justify-center gap-2">
                ${pokemon.types.map((type) => `<span class='bg-white text-black px-3 py-1 rounded-md border border-black text-sm font-semibold shadow-lg'>${type.type.name}</span>`).join(" ")}
            </div>
        </div>
        <div class="back hidden p-4 bg-white rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold capitalize text-black tracking-wide">${pokemon.name}</h2>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Experiencia Base:</strong> ${pokemon.base_experience}</p>
            <h3 class="mt-2 font-bold text-black">Estadísticas:</h3>
            <ul class="text-left list-disc list-inside text-black">
                ${pokemon.stats.map(stat => `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join("")}
            </ul>
            <h3 class="mt-2 font-bold text-black">Movimientos:</h3>
            <ul class="text-left list-disc list-inside text-black">
                ${pokemon.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join("")}
            </ul>
        </div>
    `;
    
    card.prepend(img);
    
    card.addEventListener("click", () => {
        card.querySelector(".front").classList.toggle("hidden");
        card.querySelector(".back").classList.toggle("hidden");
    });
    
    pokemonList.appendChild(card);
}

function filterPokemon() {
    const searchInput = document.getElementById("searchInput");
    searchInput.style.color = "black";
    const searchValue = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".pokemon-card");

    cards.forEach((card) => {
        const name = card.getAttribute("data-name");
        card.style.display = name.includes(searchValue) ? "block" : "none";
    });
}