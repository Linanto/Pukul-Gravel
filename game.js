const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');
const timerBoard = document.getElementById('timer');
const playButton = document.getElementById('playButton');
const restartButton = document.getElementById('restartButton');
const hitSound = document.getElementById('hitSound');
const bgMusic = document.getElementById('bgMusic');

const peepSounds = [
    document.getElementById('peepSound1'),
    document.getElementById('peepSound2'),
    document.getElementById('peepSound3')
];

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 60;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function randomPeepSound() {
    const idx = Math.floor(Math.random() * peepSounds.length);
    return peepSounds[idx];
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    const peepSound = randomPeepSound();
    peepSound.play();
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 'Score: 0';
    timerBoard.textContent = 'Time left: 60s';
    timeUp = false;
    score = 0;
    timeLeft = 60;
    peep();
    setTimeout(() => {
        timeUp = true;
        bgMusic.pause();
    }, 60000);
    startCountdown();
    playButton.style.display = 'none';
    restartButton.style.display = 'block';
}

function bonk(e) {
    if (!e.isTrusted) return; // Cheater!
    score++;
    hitSound.play();
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = 'Score: ' + score;
}

function startCountdown() {
    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerBoard.textContent = 'Time left: ' + timeLeft + 's';
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert('Game Over! Skor akhir Anda adalah: ' + score);
        }
    }, 1000);
}

function restartGame() {
    timeUp = true;
    setTimeout(() => {
        startGame();
    }, 500);
}

function initializeGame() {
    moles.forEach(mole => mole.addEventListener('click', bonk));
    playButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    bgMusic.play();
}

initializeGame();
