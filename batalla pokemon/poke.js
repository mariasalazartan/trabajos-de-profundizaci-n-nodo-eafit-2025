const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
let pokemon1 = null;
let pokemon2 = null;

/* ================== OBTENER POKÉMON ================== */
async function getPokemon(name) {
  try {
    const response = await fetch(`${pokeAPI}${name.toLowerCase()}`);
    if (!response.ok) throw new Error("❌ Pokémon no encontrado");

    const data = await response.json();
    return {
      name: data.name,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      sprite: data.sprites.front_default,
    };
  } catch (error) {
    alert(error.message);
    return null;
  }
}

/* ================== CARGAR OPCIONES DE POKÉMON ================== */
async function loadPokemonOptions() {
  try {
    const pokemonList = [];
    for (let i = 1; i <= 151; i++) {
      const response = await fetch(`${pokeAPI}${i}`);
      const data = await response.json();
      pokemonList.push({ name: data.name, id: data.id });
    }

    const select1 = document.getElementById("pokemon1-select");
    const select2 = document.getElementById("pokemon2-select");

    pokemonList.forEach((pokemon) => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      option.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      select1.appendChild(option.cloneNode(true));
      select2.appendChild(option);
    });

    select1.value = pokemonList[0].name;
    select2.value = pokemonList[1].name;

    loadPokemon(1);
    loadPokemon(2);
  } catch (error) {
    console.error("Error al cargar los Pokémon:", error);
  }
}

/* ================== CARGAR POKÉMON SELECCIONADO ================== */
async function loadPokemon(player) {
  const select = document.getElementById(`pokemon${player}-select`);
  const container = document.getElementById(`pokemon${player}`);

  const pokemon = await getPokemon(select.value);
  if (!pokemon) return;

  if (player === 1) pokemon1 = pokemon;
  if (player === 2) pokemon2 = pokemon;

  container.innerHTML = `
    <div class="pokemon-container">
      <img src="${pokemon.sprite}" alt="${pokemon.name}" class="pokemon-img">
      <h2 class="text-2xl font-bold capitalize">${pokemon.name}</h2>
      <p>❤️ HP: ${pokemon.hp}</p>
      <p>⚔️ Ataque: ${pokemon.attack}</p>
      <p>🛡️ Defensa: ${pokemon.defense}</p>
    </div>
  `;

  if (pokemon1 && pokemon2) {
    document.getElementById("fight").classList.remove("hidden");
  }
}

/* ================== EVENTOS DE SELECCIÓN ================== */
document
  .getElementById("pokemon1-select")
  .addEventListener("change", () => loadPokemon(1));
document
  .getElementById("pokemon2-select")
  .addEventListener("change", () => loadPokemon(2));

/* ================== SISTEMA DE BATALLA ================== */
document.getElementById("fight").addEventListener("click", () => {
  if (!pokemon1 || !pokemon2) {
    alert("⚠️ Ambos Pokémon deben estar seleccionados antes de pelear.");
    return;
  }

  const log = document.getElementById("battle-log");
  log.innerHTML = `<p class="text-xl font-bold">🔥 ¡Batalla iniciada! 🔥</p>`;

  let hp1 = pokemon1.hp;
  let hp2 = pokemon2.hp;
  let round = 1;

  function attack(attacker, defender, defenderHp) {
    let damage = attacker.attack - defender.defense / 2;
    return defenderHp - (damage > 0 ? Math.floor(damage) : 1);
  }

  function animateAttack(attackerId) {
    gsap.to(`#${attackerId} img`, {
      x: 30,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  }

  function updateLog(text) {
    log.innerHTML += `<p>${text}</p>`;
  }

  function battleTurn() {
    if (hp1 <= 0 || hp2 <= 0) {
      const winner = hp1 > 0 ? pokemon1.name : pokemon2.name;
      updateLog(`🎉 ¡${winner} gana la batalla! 🎉`);
      return;
    }

    updateLog(`🔄 Ronda ${round}:`);

    setTimeout(() => {
      hp2 = attack(pokemon1, pokemon2, hp2);
      animateAttack("pokemon1");
      updateLog(
        `⚡ ${pokemon1.name} ataca a ${pokemon2.name} (HP: ${hp2 > 0 ? hp2 : 0})`
      );

      if (hp2 > 0) {
        setTimeout(() => {
          hp1 = attack(pokemon2, pokemon1, hp1);
          animateAttack("pokemon2");
          updateLog(
            `🔥 ${pokemon2.name} ataca a ${pokemon1.name} (HP: ${
              hp1 > 0 ? hp1 : 0
            })`
          );

          round++;
          setTimeout(battleTurn, 1000);
        }, 1000);
      } else {
        updateLog(`🎉 ¡${pokemon1.name} gana la batalla! 🎉`);
      }
    }, 1000);
  }

  battleTurn();
});

/* ================== INICIALIZAR OPCIONES ================== */
loadPokemonOptions();
