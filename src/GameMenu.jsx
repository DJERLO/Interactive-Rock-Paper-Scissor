import React, {useState, useEffect} from 'react';
import './css/style.css'
import '../audio.js';
import'../modal.js'
import Game from "./Game.jsx"
import Modal from "./Modal.jsx"

export default function GameMenu(){
   const [showMenu, setShowMenu] = useState(false);
   const [showModal, setShowModal] = useState(false); // State to control modal visibility


 const hideMenu = () => {
    console.log("GameMenu set into False")
    setShowMenu(false);
    setShowModal(true);
    stopBgMenuMusic();
    
 };

   useEffect(() => {
    console.log("GameMenu set into True")
      // Show the game menu when the component mounts
     setShowMenu(true);
    }, []);

 return(
    <>
      {showMenu && (
      <div id="game-menu" className="game-menu" style={{display:'flex'}}>
        <div className="menu-wrapper">
          <h1>Rock Paper & Scissors</h1>
          <button id="start-game" className="btn btn-primary" onClick={hideMenu}>Start Game</button>
          <p className="credit">Sound Effect by 
            <a href="https://pixabay.com/users/xtremefreddy-32332307/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=144641">XtremeFreddy</a> from 
            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=144641">Pixabay</a>
          </p>
        </div>
      </div>
      )}

      {showModal ? <Modal isVisible={showModal} /> : null}
      <Game />
    </>
 );

}