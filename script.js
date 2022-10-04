"use strict";

const WINNING_SCORE = 50;
const THE_DICE = document.querySelector(".dice");
const NEW_GAME_BTN = document.querySelector(".btn--new");
const ROLL_DICE_BTN = document.querySelector(".btn--roll");
const HOLD_BTN = document.querySelector(".btn--hold");
const PLAYER_0 = document.querySelector(".player--0");
const PLAYER_0_SCORE = document.getElementById("score--0");
const PLAYER_0_CURRENT_SCORE = document.getElementById("current--0");
const PLAYER_1 = document.querySelector(".player--1");
const PLAYER_1_SCORE = document.getElementById("score--1");
const PLAYER_1_CURRENT_SCORE = document.getElementById("current--1");

let activePlayer;
let player0MainScore;
let player1MainScore;
let currentPlayerScore;
let currentPlayerScoreElement;
let dieRoll;
let winner;

NEW_GAME_BTN.addEventListener("click", startGame);


function setDieImage(roll) {
    THE_DICE.setAttribute("src", "dice-" + roll + ".png");
}


function rollTheDie() {
    const numberOneToSix = Math.floor(Math.random() * 6) + 1;
    setDieImage(numberOneToSix);

    return numberOneToSix;
}


function updateCurrentScore(score) {

    if (score) {
        currentPlayerScore += score; 
    }
    else if (score === 0) { 
        currentPlayerScore = 0; 
    }
    
    currentPlayerScoreElement.textContent = currentPlayerScore;
}


function changeActivePlayer() {

    updateCurrentScore(0);
    activePlayer = activePlayer ? 0 : 1;
        
    PLAYER_0.classList.toggle("player--active");
    PLAYER_1.classList.toggle("player--active");

    currentPlayerScoreElement = document.getElementById("current--" + activePlayer);
}


function endGame(gameWinner) {

    gameWinner.classList.add("player--winner");

    ROLL_DICE_BTN.removeEventListener("click", playTurn);
    HOLD_BTN.removeEventListener("click", savePlayerScore);
    NEW_GAME_BTN.style.setProperty("animation", "scaleThis 3s infinite");
    ROLL_DICE_BTN.style.setProperty("animation", "initial");
    
    currentPlayerScoreElement.textContent = "WINNER";

    return winner = true;
}


function isThereAWinner() {

    if (player0MainScore >= WINNING_SCORE) return endGame(PLAYER_0);

    if (player1MainScore >= WINNING_SCORE) return endGame(PLAYER_1);

    return false;
}


function savePlayerScore() {

    if (currentPlayerScore === 0) return;
    
    if (activePlayer) {
        player1MainScore += currentPlayerScore;
        PLAYER_1_SCORE.textContent = player1MainScore;
    }
    
    if (!activePlayer) {
        player0MainScore += currentPlayerScore;
        PLAYER_0_SCORE.textContent = player0MainScore;
    }

    if (!isThereAWinner()) changeActivePlayer();
}


function playTurn() {
    const dieRoll = rollTheDie();
    dieRoll !== 1 ? updateCurrentScore(dieRoll) : changeActivePlayer();
}


function startGame() {

    activePlayer = 0;
    player0MainScore = 0;
    player1MainScore = 0;
    currentPlayerScore = 0;
    currentPlayerScoreElement = document.getElementById("current--0");

    THE_DICE.classList.add("visible");
    PLAYER_0.classList.add("player--active");
    PLAYER_1.classList.remove("player--active");
    PLAYER_0_CURRENT_SCORE.textContent = 0;
    PLAYER_1_CURRENT_SCORE.textContent = 0;
    PLAYER_0_SCORE.textContent = 0;
    PLAYER_1_SCORE.textContent = 0;
    ROLL_DICE_BTN.addEventListener("click", playTurn);
    HOLD_BTN.addEventListener("click", savePlayerScore);

    if (winner) { 
        const winnerElement = document.querySelector(".player--winner");
        winnerElement.classList.remove("player--winner"); 
        winner = false;
    }

    NEW_GAME_BTN.textContent = "🔄 New game";
    NEW_GAME_BTN.style.setProperty("animation", "initial");
    ROLL_DICE_BTN.style.setProperty("animation", "scaleThis 3s infinite");
}