const gameMenu = document.getElementById("game-menu");
const startGameButton = document.getElementById("start-game");
const gameContent = document.getElementById("game-content"); 
const gameHandAnimation = document.getElementById("game-hand-animation");

// Show the game menu when the page loads
playBgMenuMusic();

// Get the modal element
const modal = document.getElementById("gameLimitModal");
const countdownModal = document.getElementById("startCountdownModal");
const countdownDisplay = document.getElementById("startcountdown-display");

// Get the buttons to select the game limit
const bestOfThreeBtn = document.getElementById("bestOfThreeBtn");
const bestOfFiveBtn = document.getElementById("bestOfFiveBtn");
const bestOfTenBtn = document.getElementById("bestOfTenBtn");


// Event listeners for the game limit buttons
// bestOfThreeBtn.addEventListener("click", function() {
//     closeModal();
//     console.log("Round Limit is Set to 3");
//     startGameCountdown(3); // Start the game with a limit of 3 rounds
// });

// bestOfFiveBtn.addEventListener("click", function() {
//     closeModal(); 
//     console.log("Round Limit is Set to 5");
//     startGameCountdown(5); // Start the game with a limit of 5 rounds
// });

// bestOfTenBtn.addEventListener("click", function() {
//     closeModal();
//     console.log("Round Limit is Set to 10");
//     startGameCountdown(10); // Start the game with a limit of 10 rounds
// });

// Function to start the countdown
function startGameCountdown(rounds) {
  playCountdownSound();
  const countdownModal = document.getElementById("startCountdownModal");
  const countdownDisplay = document.getElementById("startcountdown-display");
  let count = 3;
  countdownDisplay.textContent = count;

  countdownModal.style.display = "flex";
  const countdownInterval = setInterval(() => {
      count--;
      countdownDisplay.textContent = count;
      if (count === 0) {
          clearInterval(countdownInterval);
          countdownModal.style.display = "none";
          // Call the function to start the game here
          startGame(rounds);
      }
  }, 1000);
}
/* 
function displayModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}
*/

// Get the buttons by their IDs
const rockButton = document.getElementById("rock-button");
const paperButton = document.getElementById("paper-button");
const scissorButton = document.getElementById("scissor-button");

// rockButton.addEventListener("click", () => play('ROCK'));
// paperButton.addEventListener("click", () => play('PAPER'));
// scissorButton.addEventListener("click", () => play('SCISSOR'));

// function showGameButton(){
//   gameButtonsContainer.style.display = "block";
// }

// function hideGameButton(){
//   gameButtonsContainer.style.display = "none";
// }

// function showHandsAnim() {
//     gameHandAnimation.style.display = "flex";
// }

// function hideHandsAnim() {
//     gameHandAnimation.style.display = "none";
// }

function changeHandsImage(playerHandId, computerHandId, playerSrc, computerSrc, delay) {
    // Get references to the player and computer hand images
    const playerImage = document.getElementById("ph");
    const computerImage = document.getElementById("ch");
    const playerHandAnim = document.querySelector(".player-hand");
    const computerHandAnim = document.querySelector(".computer-hand");
    playerHandAnim.style.animation = "playerHandMotion 0.45s infinite alternate";
    computerHandAnim.style.animation = "computerHandMotion 0.45s infinite alternate";


    // Change the player and computer hand images after a delay
    setTimeout(function () {
        // Clear any existing animation class
        playerHandAnim.style.animation = "none";
        computerHandAnim.style.animation = "none";
        playerImage.src = playerSrc;
        computerImage.src = computerSrc;
    }, delay);


    // After another delay, reset the hands to their default images and bring back their animation
    setTimeout(function () {
        // Apply the new animation properties
       playerHandAnim.style.animation = "playerhandMotion 0.45s infinite alternate";
       computerHandAnim.style.animation = "computerhandMotion 0.45s infinite alternate";
        playerImage.src = "img/phhands/phrock.png"; // Default player hand image source
        // Apply the new animation properties
        computerImage.src = "img/chhands/chrock.png"; // Default computer hand image source

    }, delay+500); // Adjust the timing based on your requirements
}

