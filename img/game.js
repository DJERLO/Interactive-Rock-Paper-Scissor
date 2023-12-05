//Computer: Define the scores, previous player move, and choice frequencies
let computerScore = 0;
let computerChoice;
let computerDifficultyThreshold;

//Player Variables
let playerScore = 0;
let previousPlayerMove = null;
let choiceFrequencies = { ROCK: 0, PAPER: 0, SCISSOR: 0 };
let countdownInterval; // Define a variable for the interval
let winner = "No one"; // Default: Define the winner of the game
let roundLimit;        //Set the Limit of Round
const gameButtonsContainer = document.getElementById("game-buttons");

// Function to start the game
function startGame(rounds){ 
  console.log("Game Started");
  computerDifficultyThreshold = Math.random();
  playerScore = 0;
  computerScore = 0;
  previousPlayerMove = null;
  choiceFrequencies = { ROCK: 0, PAPER: 0, SCISSOR: 0 };
  roundLimit = rounds;
  playStartSound();
  startCountdown();
}
//Function that handles the game
function play(playerChoice) {
  // Clear the previous interval to avoid issues
  clearInterval(countdownInterval);
  hideGameButton();
  showHandsAnim();
  rpsSound();
  const computerChoices = ['ROCK', 'PAPER', 'SCISSOR'];

  // Display Player 1's choice
  document.getElementById("player1-choice").textContent = '...';

  // Display computer's choice
  document.getElementById("player2-choice").textContent = '...';

  // Determine the computer's choice randomly on the first attempt so it less predictable
  if (previousPlayerMove === null) {
      const randomIndex = Math.floor(Math.random() * computerChoices.length);
      computerChoice = computerChoices[randomIndex];
  } else {
      // After we use the strategy for subsequent moves
      computerChoice = determineComputerChoice();
  }

  //Check the players and computer hands and show it afterwards after the animation is done
  //Tie
  if(playerChoice === "ROCK" && computerChoice == "ROCK"){
      changeHandsImage("ph", "ch", "img/phhands/phrock.png", "img/chhands/chrock.png", 1520);
  }else if(playerChoice === "PAPER" && computerChoice == "PAPER"){
      changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chpaper.png", 1520);
  }else if(playerChoice === "SCISSOR" && computerChoice == "SCISSOR"){
    changeHandsImage("ph", "ch", "img/phhands/phscissor.png", "img/chhands/chscissor.png", 1520);
  }

  //Player Wins
  if(playerChoice === "ROCK" && computerChoice == "SCISSOR"){
      changeHandsImage("ph", "ch", "img/phhands/phrock.png", "img/chhands/chscissor.png", 1520);
  }else if(playerChoice === "PAPER" && computerChoice == "ROCK"){
      changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chrock.png", 1520);
  }else if(playerChoice === "SCISSOR" && computerChoice == "PAPER"){
    changeHandsImage("ph", "ch", "img/phhands/phscissor.png", "img/chhands/chpaper.png", 1520);
  }

  //Computer Wins
  if(playerChoice === "ROCK" && computerChoice == "PAPER"){
      changeHandsImage("ph", "ch", "img/phhands/phrock.png", "img/chhands/chpaper.png", 1520);
  }else if(playerChoice === "PAPER" && computerChoice == "SCISSOR"){
      changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chscissor.png", 1520);
  }else if(playerChoice === "SCISSOR" && computerChoice == "ROCK"){
    changeHandsImage("ph", "ch", "img/phhands/phscissor.png", "img/chhands/chrock.png", 1520);
  }
  
  //changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chscissor.png", 1520);


  setTimeout(function () {

    // Display Player 1's choice
    document.getElementById("player1-choice").textContent = playerChoice;
    
    // Display computer's choice
    document.getElementById("player2-choice").textContent = computerChoice;

    // Determine the winner based on the choices
    let result;

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'ROCK' && computerChoice === 'SCISSOR') ||
        (playerChoice === 'PAPER' && computerChoice === 'ROCK') ||
        (playerChoice === 'SCISSOR' && computerChoice === 'PAPER')
    ) {
        result = "You win!";
        playerScore = playerScore + 1;
    } else {
        result = "You lose!";
        computerScore = computerScore + 1;
    }

    // Update and display the scores
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;

    // Update the choice frequencies
    choiceFrequencies[playerChoice]++;

    // Display the result
    document.getElementById("game-result").textContent = result;

    // Update the previous player move
    previousPlayerMove = playerChoice;
    // Update the previous player move
    previousPlayerMove = playerChoice;

    // Check if the game has ended due to a player reaching the round limit
    if (playerScore === roundLimit || computerScore === roundLimit) {
        let result;
        if (playerScore > computerScore) {
            result = "Player";
            playPlayer1WinsSound();
            hideHandsAnim();
        } else if (playerScore < computerScore) {
            result = "Computer";
            playPlayer2WinsSound();
            hideHandsAnim();
        }

        // Display the winner
        document.getElementById("game-result").textContent = `${result} Wins!`;
        hideGameButton(); //Hides the GameButtons

        setTimeout(() => {
            resetGame();
        }, 2000); // 2 seconds delay before starting a new round
    } else {
        // Start the countdown timer when the player makes a choice
        startCountdown();
        hideHandsAnim();
        showGameButton();
    }
      
  }, 2000); // 2 seconds delay
       
}
// Function to start the countdown timer
function startCountdown() {
    //showGameButton();
    const countdownDisplay = document.getElementById("countdown-display");
    const countdownMessage = document.getElementById("countdown-message");

    let countdown = 10; // Set the initial countdown time in seconds

    countdownMessage.textContent = "Get ready to choose!"; // Initial message

    countdownInterval = setInterval(function () { // Assign the interval to the variable
        countdownDisplay.textContent = countdown;
        countdown--;

        if (countdown < 0) {
            timeOutSound() // Play Timeout sound
            clearInterval(countdownInterval); // Clear the interval
            //hideGameButton();
            countdownMessage.textContent = "Time's up!";
            chooseWinner(previousPlayerMove); // Chooses the who is the victor of the game
            
            // Display the result
            document.getElementById("game-result").textContent = winner + " Wins!";
      
            setTimeout(function () {
                resetGame(); // Resets the Game
            }, 2000); // 2 seconds delay
        }
    }, 1000); // Update every second
}
// Function to reset the game with a 5-second delay
function resetGame() {
    clearInterval(countdownInterval); // Clear the countdown interval
    const countdownDisplay = document.getElementById("countdown-display");
    const countdownMessage = document.getElementById("countdown-message");
    const playerScoreDisplay = document.getElementById("player-score");
    const computerScoreDisplay = document.getElementById("computer-score");
  
    playerScore = 0;
    computerScore = 0;

  // Clear player 1's choice
  document.getElementById("player1-choice").textContent = '';

  // Clear computer's choice
  document.getElementById("player2-choice").textContent = '';

    countdownDisplay.textContent = "Game will start in a moment..."; // Reset the message
    countdownMessage.textContent = ''; // Clear the message
    document.getElementById("game-result").textContent = ''; // Clear the game result
    playerScoreDisplay.textContent = '0'; // Reset player score display
    computerScoreDisplay.textContent = '0'; // Reset computer score display
    choiceFrequencies = { rock: 0, paper: 0, scissor: 0 }; // Reset the choice frequencies

    // Add a 5-second delay before calling startCountdown
    setTimeout(function () {
        //displayModal();
    }, 5000); // 5 seconds delay
}
//Function that determines the Player's choice to counters the player's most frequent choice
function determineComputerChoice() {
  //console.log(`Difficulty:${computerDifficultyThreshold}`);
  // Basic strategy: computer counters the player's most frequent choice
    const playerMostFrequentChoice = Object.keys(choiceFrequencies).reduce((a, b) =>
        choiceFrequencies[a] > choiceFrequencies[b] ? a : b
    );

    // Introduce randomness and difficulty
    if (computerDifficultyThreshold < 0.5) {
        // Computer picks the same choice as the player does, resulting in a tie if user choose the previous move
        computerChoice = previousPlayerMove;
        computerDifficultyThreshold = Math.random();
    } 
    // Computer picks a random choice
    if (computerDifficultyThreshold >= 0.5 && computerDifficultyThreshold <= 0.85) {
        // Computer picks a random choice
        const playerChoices = ['ROCK', 'PAPER', 'SCISSOR'];
        computerChoice = playerChoices[Math.floor(Math.random() * playerChoices.length)];
        computerDifficultyThreshold = Math.random();
    } 
    
  if(computerDifficultyThreshold > 0.85) {
        // Computer oppose players most frequent pick
        if (playerMostFrequentChoice === 'ROCK') {
            computerChoice = 'PAPER';
        } else if (playerMostFrequentChoice === 'PAPER') {
            computerChoice = 'SCISSOR';
        } else if (playerMostFrequentChoice === 'SCISSOR') {
            computerChoice = 'ROCK';
        }
      computerDifficultyThreshold = Math.random();
    }
  
    return computerChoice;
}
// Function to choose the winner at the end of the match
function chooseWinner(playerChoice) {
  //hideHandsAnim();
  if (!playerChoice) {
    winner = "No one"; // It's a tie
  } 
  else {
    
    // If the timers go to zero
    if (playerScore === computerScore) {
      winner = "No one"; // It's a tie
    } 
    else {
      if (playerScore > computerScore) {
        winner = "Player"; // Player wins the match
        playPlayer1WinsSound();
        hideHandsAnim();
      } else if (playerScore < computerScore) {
        winner = "Computer"; // Computer wins the match
        playPlayer2WinsSound();
        hideHandsAnim();
      }else{
         winner = "No one"; // It's a tie
      }
    }
    
    // If the Round ends
    if (playerScore === roundLimit || computerScore === roundLimit) {
      if (playerScore > computerScore) {
        winner = "Player"; // Player wins the match
      } else if (playerScore < computerScore) {
        winner = "Computer"; // Computer wins the match
      }else {
        winner = "No one"; // It's a tie
      }
     
    }
  }
  // Display the result
  document.getElementById("game-result").textContent = winner + " Wins!";
}


