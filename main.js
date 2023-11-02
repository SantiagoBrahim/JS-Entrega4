const pokemonCard = document.querySelector(".card");

const pokemonSearchInput = document.getElementById("pokemon-search");
const pokemonForm = document.querySelector(".pokemon-form");

/// ----------------

const isInputEmpty = (input) => {
  return !input.value.trim().length;
};

const showError = (input, msg) => {
  input.classList.remove("success");
  input.classList.add("error");
  const errorMsg = input.parentElement.querySelector(".error-msg");
  errorMsg.innerText = msg;
};

const showSuccess = (input) => {
  input.classList.remove("error");
  input.classList.add("success");
};

const isInputValid = (input) => {
  let valid = false;
  if (isInputEmpty(input)) {
    showError(input, "El campo no puede estar vacío");
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};

const verifyInput = (e) => {
  isInputValid(e.target);
};

const getPokemonTypes = (types) => {
  return types
    .map((item) => {
      return `<li> - ${item.type.name} </li>`;
    })
    .join("");
};

const renderPokemon = (pokemon) => {
  const { sprites, name, types, height, weight } = pokemon;
  pokemonCard.innerHTML = `      
    <div class="pokemon-container">
        <img src="${sprites.front_default}" class="pokemon-img" />
        <h2>${name}</h2>
        <ul>
        ${getPokemonTypes(types)}
        </ul>
        <h3 class="altura">Altura: <span class="bold">${
          height / 10
        }m</span></h3>
        <h3 class="peso">Peso: <span class="bold">${weight / 10}kg</span></h3>
    </div>`;
};

const getPokemon = async (numPokemon) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${numPokemon}`
    );
    const pokemon = await response.json();
    renderPokemon(pokemon);
  } catch (error) {
    console.log(error);
    showError(
      pokemonSearchInput,
      "Lo sentimos, no se encontró un pokemon con ese número"
    );
  }
};

const verifyForm = (e) => {
  e.preventDefault();
  if (isInputValid(pokemonSearchInput)) {
    let numPokemon = pokemonSearchInput.value.trim();
    getPokemon(numPokemon);
  }
};

const init = () => {
  pokemonSearchInput.addEventListener("input", verifyInput);
  pokemonForm.addEventListener("submit", verifyForm);
};
init();
