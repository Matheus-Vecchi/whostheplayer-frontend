import { listAllPlayers, startGame, guess } from "./api.js";

let allPlayers = [];
let currentGameId = null;

const newGameBtn = document.querySelector(".start-btn");
const status = document.querySelector(".status");
const guesses = document.querySelector(".guesses");
const guessForm = document.querySelector(".guess-form");
const guessInput = document.querySelector(".guess-form input");

newGameBtn.addEventListener("click", async () => {
  status.textContent = "Starting...";
  try {
    const game = await startGame();
    currentGameId = game.gameId;     
    guesses.innerHTML = "";          
    status.textContent = "Game started";
  } catch (err) {
    status.textContent = "Failed to start the game";
    console.error(err);
  }
});

guessForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!currentGameId) {
    status.textContent = "Start a game first";
    return;
  }

  const guessName = guessInput.value.trim();
  if (!guessName) return;

  const player = allPlayers.find(
    (p) => p.playerName.toLowerCase() === guessName.toLowerCase()
  );

  if (!player) {
    status.textContent = "Player not found";
    return;
  }

  try {
    const result = await guess(currentGameId, player.playerId);  
    renderGuess(player.playerName, result);                       
    guessInput.value = "";
  } catch (err) {
    status.textContent = "Failed to submit guess";
    console.error(err);
  }
});

function clueClass(clue) {
  switch (clue) {
    case "CORRECT": return "hint-correct";
    case "WRONG":   return "hint-wrong";
    case "HIGHER":  return "hint-higher";
    case "LOWER":   return "hint-lower";
    default:        return "";
  }
}

function renderGuess(name, result) {
  const li = document.createElement("li");
  li.className = "guess-row";
  li.innerHTML = `
    <span class="name">${name}</span>
    <span class="cell ${clueClass(result.clueAge)}">age</span>
    <span class="cell ${clueClass(result.clueCountry)}">country</span>
    <span class="cell ${clueClass(result.clueLeague)}">league</span>
    <span class="cell ${clueClass(result.clueClub)}">club</span>
    <span class="cell ${clueClass(result.cluePosition)}">position</span>
  `;
  guesses.appendChild(li);
}

async function init() {
  try {
    allPlayers = await listAllPlayers();
    console.log("jogadores carregados: ", allPlayers);
  } catch (err) {
    console.log("Falha ao carregar jogadores", err);
  }
}
init();