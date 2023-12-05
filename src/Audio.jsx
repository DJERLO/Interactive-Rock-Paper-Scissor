
import React, { useEffect } from 'react';

const AudioHandler = () => {
  // Add your sounds here
  const menuMusic = new Audio("SFX/bg_menu.mp3");
  const countdownSound = new Audio("SFX/countdown.mp3");
  const startSound = new Audio("SFX/Start.mp3");
  const hoverSound = new Audio("SFX/hover.mp3");
  const clickSound = new Audio("SFX/click.mp3");
  const winSound1 = new Audio("SFX/player1wins.mp3");
  const winSound2 = new Audio("SFX/player2wins.mp3");
  const timeOut = new Audio("SFX/timeout.mp3");
  const rps = new Audio("SFX/rockpaperscissors.mp3");

  // Function to play Countdown sound
  const playCountdownSound = () => {
    countdownSound.play();  
  }

  // Function to play Start sound
  const playStartSound = () => {
    startSound.play();  
  }

  // Function to play Hover sound
  const playHoverSound = () => {
    hoverSound.play();  
  }

  // Function to play Click sound
  const playClickSound = () => {
    clickSound.play();   
  }

  // Function to play Player 1 Win sound
  const playPlayer1WinsSound = () => {
    winSound1.play();   
  }

  // Function to play Player 2 Win sound
  const playPlayer2WinsSound = () => {
    winSound2.play();   
  }

  // Function to play Timeout sound
  const playTimeOutSound = () => {
    timeOut.play();  
  }

  // Function to play Rock Paper Scissors sound
  const playRpsSound = () => {
    rps.play();  
  }

  // Function to play Background menu music
  const playBgMenuMusic = () => {
    menuMusic.loop = true;
    menuMusic.play();
  }

  // Function to stop Background menu music
  const stopBgMenuMusic = () => {
    menuMusic.muted = true;
  }

  useEffect(() => {
    // Add event listeners here
    const gameOptions = document.querySelectorAll(".rock, .paper, .scissor");

    gameOptions.forEach((gameOption) => {
      gameOption.addEventListener("mouseover", playHoverSound);
      gameOption.addEventListener("click", playClickSound);
      // Add other event listeners as needed
    });

    return () => {
      // Cleanup event listeners when component unmounts
      gameOptions.forEach((gameOption) => {
        gameOption.removeEventListener("mouseover", playHoverSound);
        gameOption.removeEventListener("click", playClickSound);
        // Remove other event listeners as needed
      });
    };
  }, []); // Empty dependency array to run this effect only once on mount

  return null; // This component doesn't render anything, it handles audio events
};

export default AudioHandler;