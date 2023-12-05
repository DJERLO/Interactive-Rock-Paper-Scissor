import React, { useState, useEffect, useRef } from 'react';
import './css/style.css';

const Game = ({rounds, ready}) => {
  let [gameState, setGameState] = useState(false);
  //let [playerChoice, setPlayerChoice] = useState('')
  //let [computerChoice, setComputerChoice] = useState('')
  //let [computerScore, setComputerScore] = useState(0);
  //let [playerScore, setPlayerScore] = useState(0);
  let [previousPlayerMove, setPreviousPlayerMove] = useState(null);
  let [choiceFrequencies, setChoiceFrequencies] = useState({ ROCK: 0, PAPER: 0, SCISSOR: 0 });
  //const [randomIndex, setRandomIndex] = useState(0); // unused outdated
  let [computerDifficultyThreshold, setComputerDifficultyThreshold] = useState(0);
  let [countdownInterval, setCountdownInterval] = useState(null);
  const [countdownValue, setCountdownValue] = useState(10);
  const [countdownMessage, setCountdownMessage] = useState("Get ready to choose!");
  //let [result, setResult] = useState("....");
  //let [winner, setWinner] = useState("No one");

  const resultRef = useRef("...."); // Ref for result
  const winnerRef = useRef("No one"); // Ref for winner
  
  let [roundLimit, setRoundLimit] = useState(rounds);
  var [isPlayRun, setIsPlayRun] = useState(true)

  // Function to update result
  const updateResult = (newResult) => {
    resultRef.current = newResult;
  };

  // Function to update winner
  const updateWinner = (newWinner) => {
    winnerRef.current = `${newWinner} Wins!`;
  };

  let intervalId = useRef(0);
  let resetintervalId = () => {
    clearInterval(intervalId.current); // Clear the previous countdown interval
    setCountdownValue(10);
  }
  const gameButtons = document.getElementById("game-buttons")
  const [gameButtonsVisible, setGameButtonsVisible] = useState(true);
  const showGameButtons = () => {
    
    setGameButtonsVisible(true);
    gameButtons.style.display = "block";
  };
  const hideGameButtons = () => {
    setGameButtonsVisible(false);
    gameButtons.style.display = "none";
    
  };

  const [handsAnimationVisible, setHandsAnimationVisible] = useState(false);
  const showHandsAnim = () => {
    setHandsAnimationVisible(true);
    
  };
  const hideHandsAnim = () => {
    setHandsAnimationVisible(false);
  };

  const playerScoreRef = useRef(0);
  const computerScoreRef = useRef(0);

  // Create functions to update the "state" stored in refs
  const setPlayerScore = (score) => {
    playerScoreRef.current = score;
  };

  const setComputerScore = (score) => {
    computerScoreRef.current = score;
  };


  const startGame = () => {
      setComputerDifficultyThreshold(Math.random());
      setComputerScore(0);
      setPlayerScore(0);
      setPreviousPlayerMove(null);
      setChoiceFrequencies({ ROCK: 0, PAPER: 0, SCISSOR: 0 });
      setRoundLimit(rounds);
      playStartSound();
      play({mount:false});
      startCountdown();
    
  };

  const startCountdown = () => {
    resetintervalId();
    showGameButtons();

    let countdown = 10; // Set the initial countdown time in seconds

    setCountdownMessage("Get ready to choose!"); // Initial message
    
      intervalId.current = setInterval(() => {
      setCountdownValue(countdown);
      countdown--;
      if (countdown <= 0) {
        timeOutSound(); // Play Timeout sound
        clearInterval(intervalId.current); // Clear the interval
        hideGameButtons();
        setCountdownValue('...'); // Initial message
        setCountdownMessage("Time's up!");
        chooseWinner(playerScoreRef, computerScoreRef); // Chooses who is the victor of the game

        // Display the result
        //document.getElementById("game-result").textContent = winner + " Wins!";
        ///setResult(winner + " Wins!");
        updateResult(winnerRef.current);

        setTimeout(() => {
          resetGame(); // Resets the Game
        }, 2000); // 2 seconds delay
      }
        setCountdownValue(countdown); // Initial message
    }, 1000); // Update every second

    setCountdownInterval(intervalId.current);
  };

  const play = ({player, computer, mount}) => {
    setIsPlayRun(true) // Set the play run to true for runnning the first time
   
    //if mounted then run the function of the game
    if(mount && isPlayRun){
      resetintervalId();
      hideGameButtons();
      showHandsAnim();
      rpsSound();
      
      const playerChoice = player;
      const computerChoice = computer;
      console.log(`Player Pick: ${playerChoice}\nComputer Pick: ${computerChoice}`);

      //Check the players and computer hands and show it afterwards after the animation is done
      //Tie
      if (playerChoice === "ROCK" && computerChoice == "ROCK") {
        changeHandsImage("ph", "ch", "img/phhands/phrock.png", "img/chhands/chrock.png", 1520);
      } else if (playerChoice === "PAPER" && computerChoice == "PAPER") {
        changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chpaper.png", 1520);
      } else if (playerChoice === "SCISSOR" && computerChoice == "SCISSOR") {
        changeHandsImage("ph", "ch", "img/phhands/phscissor.png", "img/chhands/chscissor.png", 1520);
      }
  
      //Player Wins
      if (playerChoice === "ROCK" && computerChoice == "SCISSOR") {
        changeHandsImage("ph", "ch", "img/phhands/phrock.png", "img/chhands/chscissor.png", 1520);
      } else if (playerChoice === "PAPER" && computerChoice == "ROCK") {
        changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chrock.png", 1520);
      } else if (playerChoice === "SCISSOR" && computerChoice == "PAPER") {
        changeHandsImage("ph", "ch", "img/phhands/phscissor.png", "img/chhands/chpaper.png", 1520);
      }
  
      //Computer Wins
      if (playerChoice === "ROCK" && computerChoice == "PAPER") {
        changeHandsImage("ph", "ch", "img/phhands/phrock.png", "img/chhands/chpaper.png", 1520);
      } else if (playerChoice === "PAPER" && computerChoice == "SCISSOR") {
        changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chscissor.png", 1520);
      } else if (playerChoice === "SCISSOR" && computerChoice == "ROCK") {
        changeHandsImage("ph", "ch", "img/phhands/phscissor.png", "img/chhands/chrock.png", 1520);
      }
  
      //changeHandsImage("ph", "ch", "img/phhands/phpaper.png", "img/chhands/chscissor.png", 1520);
  
      // After performing game logic..
      const playerDisplayPick = () => {document.getElementById("player1-choice").textContent = playerChoice};
      // Display computer's choice
      const computerDisplayPick = () => {document.getElementById("player2-choice").textContent = computerChoice};
      
      setTimeout(() => {
        
        // Display Player 1's choice
        playerDisplayPick();
        computerDisplayPick();
  
        // Determine the winner based on the choice
        if (playerChoice === computerChoice) {
            updateResult("It's a Tie");
        } else if (
          (playerChoice === 'ROCK' && computerChoice === 'SCISSOR') ||
          (playerChoice === 'PAPER' && computerChoice === 'ROCK') ||
          (playerChoice === 'SCISSOR' && computerChoice === 'PAPER')
        ) {
          updateResult("You Win!");
          setPlayerScore(playerScoreRef.current + 1);
        } else {
          updateResult("You Lose!");
          setComputerScore(computerScoreRef.current + 1);
        }
  
        // Update the choice frequencies
        choiceFrequencies[playerChoice]++;
        // Update the previous player move
        setPreviousPlayerMove(player);
  
        // Check if the game has ended due to a player reaching the round limit
        if (playerScoreRef.current === roundLimit || computerScoreRef.current === roundLimit) {
          if (playerScoreRef.current > computerScoreRef.current) {
            updateWinner("Player");
            updateResult(winnerRef.current);
            playPlayer1WinsSound();
            hideHandsAnim();
          } else if (playerScoreRef.current < computerScoreRef.current) {
            updateWinner("Computer");
            updateResult(winnerRef.current);
            playPlayer2WinsSound();
            hideHandsAnim();
          }
          // Rest of your logic...
          setTimeout(() => {
              resetGame();
          }, 2000); // 2 seconds delay before starting a new round
        } else {
          // Start the countdown timer when the player makes a choice
          startCountdown();
          hideHandsAnim();
        }
      }, 2000); // 2 seconds delay
    }
    else {
      console.log("play mounted")
    }
  };


  const computerPick = () => {
    const computerChoices = ['ROCK', 'PAPER', 'SCISSOR'];
    if (previousPlayerMove === null) {
      const randomIdx = Math.floor(Math.random() * computerChoices.length);
      return computerChoices[randomIdx]; // Return the computer's choice
    } else {
      return determineComputerChoice(); // Use the strategy for subsequent moves
    }
  };
  
  const playerPick = (player) => {
    const computerChoice = computerPick();
    play({ player: player, computer: computerChoice, mount: true });
  };

  

  const determineComputerChoice = () => {
    const playerMostFrequentChoice = Object.keys(choiceFrequencies).reduce((a, b) =>
      choiceFrequencies[a] > choiceFrequencies[b] ? a : b
    );

    let newComputerChoice = '';

    if (computerDifficultyThreshold < 0.5) {
      newComputerChoice = previousPlayerMove;
      setComputerDifficultyThreshold(Math.random());
    } else if (computerDifficultyThreshold >= 0.5 && computerDifficultyThreshold <= 0.85) {
      const playerChoices = ['ROCK', 'PAPER', 'SCISSOR'];
      newComputerChoice = playerChoices[Math.floor(Math.random() * playerChoices.length)];
      setComputerDifficultyThreshold(Math.random());
    } else if (computerDifficultyThreshold > 0.85) {
      if (playerMostFrequentChoice === 'ROCK') {
        newComputerChoice = 'PAPER';
      } else if (playerMostFrequentChoice === 'PAPER') {
        newComputerChoice = 'SCISSOR';
      } else if (playerMostFrequentChoice === 'SCISSOR') {
        newComputerChoice = 'ROCK';
      }
      setComputerDifficultyThreshold(Math.random());
    }

    return newComputerChoice;
  };
  
  const chooseWinner = () => {
    if (playerScoreRef.current === computerScoreRef.current) {
      updateWinner("No one"); // It's a tie
    }
    else if (playerScoreRef.current > computerScoreRef.current) {
      updateWinner("Player"); // Player wins the match
      playPlayer1WinsSound();
      hideHandsAnim();
    } else if (playerScoreRef.current < computerScoreRef.current) {
      updateWinner("Computer"); // Computer wins the match
      playPlayer2WinsSound();
      hideHandsAnim();
    }
      

      if (playerScoreRef.current === roundLimit || computerScoreRef.current === roundLimit) {
        if (playerScoreRef.current > computerScoreRef.current) {
          updateWinner("Player"); // Player wins the match
        } else if (playerScoreRef.current < computerScoreRef.current) {
          updateWinner("Computer"); // Computer wins the match
        } else if (playerScoreRef.current === computerScoreRef.current) {
          updateWinner("No one") // It's a tie
        }
      }
      // Display the result
      hideGameButtons();
    }
  
  const resetGame = () => {
    clearInterval(countdownInterval); // Clear the countdown interval
    // Resetting scores and other elements in the game
    setPlayerScore(0);
    setComputerScore(0);
    updateWinner("...");
    updateResult("...")
    //setPlayerChoice('...');
    //setComputerChoice('...');

    document.getElementById("player1-choice").textContent = '...';
    document.getElementById("player2-choice").textContent = '...';

    //const countdownDisplay = document.getElementById("countdown-display");
    //const countdownMessage = document.getElementById("countdown-message");
    //countdownDisplay.textContent = "Game will start in a moment..."; // Reset the message
    //countdownMessage.textContent = ''; // Clear the message

    setCountdownMessage('');
    setCountdownValue("Game will start in a moment...")
    
    ///setResult('...'); // Clear the game result
    setChoiceFrequencies({ ROCK: 0, PAPER: 0, SCISSOR: 0 }); // Reset the choice frequencies

    // Add a 5-second delay before calling startCountdown
    setTimeout(() => {
      // Do something after the delay, e.g., start the game again
      startCountdown();
    }, 5000); // 5 seconds delay
  };

  useEffect(() => {
      if(ready){
        startGame(rounds);
        setGameState(true);
      }else {
        setGameState(false)
      }
  }, [rounds]);



  return (
    <>
      <div className="container text-center">
        <h1 className="result header text-center">Rock Paper Scissors</h1>

        <div className="result my-4">
          <div className="row">
            <div className="col-1">
              <div className="scoreboard-bo"></div>
              <div className="scoreboard">
                <h2 className="score-number text-center display-result">Player's Score</h2>
                <p id="player-score" className="score-number text-center display-result">{playerScoreRef.current}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="scoreboard">
                <h2 className="score-number text-center display-result">Result</h2>
                <p id="game-result" className="score-number display-result">{resultRef.current}</p>
              </div>
            </div>
            <div className="col-1">
              <div className="scoreboard">
                <h2 className="score-number text-center display-result">Computer Score</h2>
                <p id="computer-score" className="score-number display-result">{computerScoreRef.current}</p>

              </div>
            </div>
          </div>
        </div>


        <div className="row align-items-center display-section">
          <div className="col-4">
            <div className="player-hands">
              <h2>Player</h2>
              <p className="display-choice"><span id="player1-choice"></span></p>
            </div>
          </div>
          <div className="col-4">
            <div className="player-hands">
              <h2>Computer</h2>
              <p className="display-choice"><span id="player2-choice"></span></p>
            </div>
          </div>
        </div>


        <div className="hands-panel" id="game-hand-animation" style={{ display: handsAnimationVisible ? 'flex' : 'none' }} >
          <div className="col-4 player">
            <div className="player-hand">
              <img id="ph" src="img/phhands/phrock.png" alt="" width="200px" height="200px" />
            </div>
          </div>

          <div className="col-4 computer">
            <div className="computer-hand">
              <img id="ch" src="img/chhands/chrock.png" alt="" width="200px" height="200px" />
            </div>
          </div>
        </div>

        {gameButtonsVisible &&(
        <div id="game-buttons" className="row my-4">
          <div className="col-4 game-button">
            <button className="btn btn-dark btn-lg btn-block game-option rock" id="rock-button" 
              onClick={() => {
                playClickSound();
                playerPick("ROCK");
              }} onMouseEnter={playHoverSound}></button>
          </div>
          <div className="col-4 game-button">
            <button className="btn btn-dark btn-lg btn-block game-option paper" id="paper-button" 
              onClick={() => { 
                playClickSound();
                playerPick("PAPER");}
              } onMouseEnter={playHoverSound}></button>
          </div>
          <div className="col-4 game-button">
            <button className="btn btn-dark btn-lg btn-block game-option scissor" id="scissor-button" 
              onClick={() => { 
                playClickSound();
                playerPick("SCISSOR");}} onMouseEnter={playHoverSound}></button>
          </div>
        </div>
      )}

        <div className="row">
          <div className="col-12 text-center">
            <div id="countdown-timer" className="countdown-timer">
              <p id="countdown-message" className="countdown-message">{countdownMessage}</p>
              <div id="countdown-display" className="countdown-display">{countdownValue}</div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
export default Game;