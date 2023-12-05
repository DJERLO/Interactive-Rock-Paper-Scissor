// Get the game-option elements
const gameOptions = document.querySelectorAll(".rock, .paper, .scissor");

// Add event listeners to play sound on hover
gameOptions.forEach((gameOption) => {
  gameOption.addEventListener("mouseover", playHoverSound);
});

// Add event listeners to play sound on click
gameOptions.forEach((gameOption) => {
  gameOption.addEventListener("click", playClickSound);
});

//Add your sounds here
let menuMusic = new Audio("SFX/bg_menu.mp3"); 
let countdownSound = new Audio("SFX/countdown.mp3");
let startSound = new Audio("SFX/Start.mp3");
let hoverSound = new Audio("SFX/hover.mp3");
let clickSound = new Audio("SFX/click.mp3");
let winSound1 = new Audio("SFX/player1wins.mp3");
let winSound2 = new Audio("SFX/player2wins.mp3");
let timeOut = new Audio("SFX/timeout.mp3");
let rps= new Audio("SFX/rockpaperscissors.mp3");



// Function to play 3-seconds Countdown sound
function playCountdownSound() {
  countdownSound.play();  // Play the countdown sound effect
}
// Function to play Start sound
function playStartSound() {
  startSound.play();  // Play the Start sound effect
}
// Function to play Hover sound
function playHoverSound() {
  hoverSound.play();  // Play the hover sound effect
}
// Function to play Click sound
function playClickSound() {
  clickSound.play();   // Play the click sound effect
}
// Function to player 1 Win sound
function playPlayer1WinsSound() {
  winSound1.play();   // Play the win sound effect
}
// Function to player 2 Win sound
function playPlayer2WinsSound() {
  winSound2.play();   // Play the win sound effect
}

// Function to Timeout sound
function timeOutSound() {
  timeOut.play();  
}

// Function to Rock Paper Scissors Shoot! sound
function rpsSound() {
  rps.play();  
}

function playBgMenuMusic(){
  menuMusic.loop = true;
  menuMusic.play();
}

function stopBgMenuMusic(){
  menuMusic.muted = true;
}
