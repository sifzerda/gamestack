

const StartScreen = ({ onStartGame, onHighScores }) => {  // add onFinalScore for debugging
  
    return (
      <div className='start-container'>
      <div className="start-screen">
        <div className="start-screen-background">
        <button className="p-btn" onClick={onStartGame}> Start Game</button>

<p className='club-logo'> ♧</p>

            <button className="p-btn" onClick={onHighScores}> High Scores</button>

{/*
  <button className="p-btn" onClick={onFinalScore}> Final Scores  - debugging </button>
*/ }

            </div>
          </div>   
          </div>
    );
  };
  
  export default StartScreen;