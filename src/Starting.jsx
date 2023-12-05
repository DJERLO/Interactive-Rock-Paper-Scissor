
import React, { useState, useEffect } from 'react';

const Starting = ({ isStarting, count }) => {
  const [gameStarts, setGameStarts] = useState('none');

  useEffect(() => {
    if (isStarting) {
      setGameStarts('flex');
      playCountdownSound(); // Assuming playCountdownSound is a defined function
    } else {
      setGameStarts('none');
    }
  }, [isStarting]);

  return (
    <div id="startCountdownModal" className="start-countdown" style={{ display: gameStarts }}>
      <div id="startcountdown-display" className="startcountdown-display">
        {count}
      </div>
    </div>
  );
};

export default Starting;
