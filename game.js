// Mini Game: Catch the Hobby Icon

const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const highScoreDisplay = document.getElementById("highScore");
const message = document.getElementById("gameMessage");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let gameRunning = false;

const icons = ["📚", "🎧", "✈️"];

let highScore = localStorage.getItem("hobbyHighScore") || 0;
highScoreDisplay.textContent = highScore;

function moveTarget() {
  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;
  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
  target.textContent = icons[Math.floor(Math.random() * icons.length)];
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;

  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  message.textContent = "Game Started!";
  message.style.color = "inherit";

  moveTarget();
  gameInterval = setInterval(moveTarget, 800);

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameRunning = false;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("hobbyHighScore", highScore);
  }

  highScoreDisplay.textContent = highScore;
  message.textContent = "⏰ Time's up! Final Score: " + score;
  message.style.color = score >= 15 ? "green" : "red";
}

function resetGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameRunning = false;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  message.textContent = "Game reset. Press Start!";
  message.style.color = "inherit";
}

target.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  scoreDisplay.textContent = score;
  moveTarget();
});

document.getElementById("startGame").onclick = startGame;
document.getElementById("resetGame").onclick = resetGame;
