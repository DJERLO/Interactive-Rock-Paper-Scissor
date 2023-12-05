
import '../modal.js'
import '../game.js'
import '../audio.js'
import './css/style.css'
import Starting from "./Starting.jsx"
import Game from './Game.jsx'

import React, { useState, useEffect } from 'react';

const Modal = ({ isVisible }) => {
  const [showModal, setShowModal] = useState('');
  const [showCountDown, setShowCountDown] = useState(false);
  const [gameCountDown, setGameCountDown] = useState(3);
  const [round, setRound] = useState(0);
  const [gameStarted ,setGameStarted] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowModal('block');
    } else {
      setShowModal('none');
    }
  }, [isVisible]);

  const startCountdown = (round) => {
    setShowModal("none"); // Hide the modal when countdown starts
    setGameCountDown(3); // Set the initial countdown value
    setShowCountDown(true); //Show the countdown sequence
    setRound(round); //set the round/gamelimit

    const countdownInterval = setInterval(() => {
      setGameCountDown((prevCount) => prevCount - 1); // Decrement the countdown
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval); // Stop the countdown after 3 seconds
      setShowCountDown(false); // Hide the countdown component
      setRound(round);
      console.log(`Game Started - Round Limit: ${round}`);
      setGameStarted(true);
    }, 3000);
  };

  return (
    <>
      <div id="gameLimitModal" className="modal" style={{ display: showModal }}>
        <div className="modal-content">
          <h2>Choose Your Game Limit</h2>
          <p>Select the number of rounds:</p>
          <button id="bestOfThreeBtn" onClick={() => startCountdown(3)}>Best of Three</button>
          <button id="bestOfFiveBtn" onClick={() => startCountdown(5)}>Best of Five</button>
          <button id="bestOfTenBtn" onClick={() => startCountdown(10)}>Best of Ten</button>
        </div>
      </div>
      {showCountDown && <Starting isStarting={showCountDown} count={gameCountDown} />}
      {showCountDown === false && <Game rounds={round} ready={gameStarted} />}
    </>
  );
};

export default Modal;
