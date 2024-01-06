const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
let score = 0;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole();
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timeUp = false;
  peep();
  setTimeout(() => timeUp = true, 10000); // 10 seconds for the game
}

function bonk(e) {
  if (!e.isTrusted) return; // Prevent fake clicks
  if (!timeUp && e.target.matches('.up')) {
    e.target.classList.remove('up');
    score++;
    scoreDisplay.textContent = score;
  }
}

holes.forEach(hole => hole.addEventListener('click', bonk));

// Start the game when the page loads
startGame();
