import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StartScreen from './StartScreen';
import Highscores from './Highscores';
// facedown card image
import cardBack from '../../public/images/cardBack.jpg';

// Define initial squares and boxes data
const initialCards = [
  // HEARTS 
  { id: 'card-1', suit: 'Hearts', rank: 'Ace', color: 'Red', image: '../../public/images/heartA.jpg' },
  { id: 'card-2', suit: 'Hearts', rank: '2', color: 'Red', image: '../../public/images/heart2.jpg' },
  { id: 'card-3', suit: 'Hearts', rank: '3', color: 'Red', image: '../../public/images/heart3.jpg' },
  { id: 'card-4', suit: 'Hearts', rank: '4', color: 'Red', image: '../../public/images/heart4.jpg' },
  { id: 'card-5', suit: 'Hearts', rank: '5', color: 'Red', image: '../../public/images/heart5.jpg' },
  { id: 'card-6', suit: 'Hearts', rank: '6', color: 'Red', image: '../../public/images/heart6.jpg' },
  { id: 'card-7', suit: 'Hearts', rank: '7', color: 'Red', image: '../../public/images/heart7.jpg' },
  { id: 'card-8', suit: 'Hearts', rank: '8', color: 'Red', image: '../../public/images/heart8.jpg' },
  { id: 'card-9', suit: 'Hearts', rank: '9', color: 'Red', image: '../../public/images/heart9.jpg' },
  { id: 'card-10', suit: 'Hearts', rank: '10', color: 'Red', image: '../../public/images/heart10.jpg' },
  { id: 'card-11', suit: 'Hearts', rank: 'Jack', color: 'Red', image: '../../public/images/heartJ.jpg' },
  { id: 'card-12', suit: 'Hearts', rank: 'Queen', color: 'Red', image: '../../public/images/heartQ.jpg' },
  { id: 'card-13', suit: 'Hearts', rank: 'King', color: 'Red', image: '../../public/images/heartK.jpg' },

  // DIAMONDS
  { id: 'card-14', suit: 'Diamonds', rank: 'Ace', color: 'Red', image: '../../public/images/diamondA.jpg' },
  { id: 'card-15', suit: 'Diamonds', rank: '2', color: 'Red', image: '../../public/images/diamond2.jpg' },
  { id: 'card-16', suit: 'Diamonds', rank: '3', color: 'Red', image: '../../public/images/diamond3.jpg' },
  { id: 'card-17', suit: 'Diamonds', rank: '4', color: 'Red', image: '../../public/images/diamond4.jpg' },
  { id: 'card-18', suit: 'Diamonds', rank: '5', color: 'Red', image: '../../public/images/diamond5.jpg' },
  { id: 'card-19', suit: 'Diamonds', rank: '6', color: 'Red', image: '../../public/images/diamond6.jpg' },
  { id: 'card-20', suit: 'Diamonds', rank: '7', color: 'Red', image: '../../public/images/diamond7.jpg' },
  { id: 'card-21', suit: 'Diamonds', rank: '8', color: 'Red', image: '../../public/images/diamond8.jpg' },
  { id: 'card-22', suit: 'Diamonds', rank: '9', color: 'Red', image: '../../public/images/diamond9.jpg' },
  { id: 'card-23', suit: 'Diamonds', rank: '10', color: 'Red', image: '../../public/images/diamond10.jpg' },
  { id: 'card-24', suit: 'Diamonds', rank: 'Jack', color: 'Red', image: '../../public/images/diamondJ.jpg' },
  { id: 'card-25', suit: 'Diamonds', rank: 'Queen', color: 'Red', image: '../../public/images/diamondQ.jpg' },
  { id: 'card-26', suit: 'Diamonds', rank: 'King', color: 'Red', image: '../../public/images/diamondK.jpg' },

  // CLUBS
  { id: 'card-27', suit: 'Clubs', rank: 'Ace', color: 'Black', image: '../../public/images/clubA.jpg' },
  { id: 'card-28', suit: 'Clubs', rank: '2', color: 'Black', image: '../../public/images/club2.jpg' },
  { id: 'card-29', suit: 'Clubs', rank: '3', color: 'Black', image: '../../public/images/club3.jpg' },
  { id: 'card-30', suit: 'Clubs', rank: '4', color: 'Black', image: '../../public/images/club4.jpg' },
  { id: 'card-31', suit: 'Clubs', rank: '5', color: 'Black', image: '../../public/images/club5.jpg' },
  { id: 'card-32', suit: 'Clubs', rank: '6', color: 'Black', image: '../../public/images/club6.jpg' },
  { id: 'card-33', suit: 'Clubs', rank: '7', color: 'Black', image: '../../public/images/club7.jpg' },
  { id: 'card-34', suit: 'Clubs', rank: '8', color: 'Black', image: '../../public/images/club8.jpg' },
  { id: 'card-35', suit: 'Clubs', rank: '9', color: 'Black', image: '../../public/images/club9.jpg' },
  { id: 'card-36', suit: 'Clubs', rank: '10', color: 'Black', image: '../../public/images/club10.jpg' },
  { id: 'card-37', suit: 'Clubs', rank: 'Jack', color: 'Black', image: '../../public/images/clubJ.jpg' },
  { id: 'card-38', suit: 'Clubs', rank: 'Queen', color: 'Black', image: '../../public/images/clubQ.jpg' },
  { id: 'card-39', suit: 'Clubs', rank: 'King', color: 'Black', image: '../../public/images/clubK.jpg' },

  // SPADES
  { id: 'card-40', suit: 'Spades', rank: 'Ace', color: 'Black', image: '../../public/images/spadeA.jpg' },
  { id: 'card-41', suit: 'Spades', rank: '2', color: 'Black', image: '../../public/images/spade2.jpg' },
  { id: 'card-42', suit: 'Spades', rank: '3', color: 'Black', image: '../../public/images/spade3.jpg' },
  { id: 'card-43', suit: 'Spades', rank: '4', color: 'Black', image: '../../public/images/spade4.jpg' },
  { id: 'card-44', suit: 'Spades', rank: '5', color: 'Black', image: '../../public/images/spade5.jpg' },
  { id: 'card-45', suit: 'Spades', rank: '6', color: 'Black', image: '../../public/images/spade6.jpg' },
  { id: 'card-46', suit: 'Spades', rank: '7', color: 'Black', image: '../../public/images/spade7.jpg' },
  { id: 'card-47', suit: 'Spades', rank: '8', color: 'Black', image: '../../public/images/spade8.jpg' },
  { id: 'card-48', suit: 'Spades', rank: '9', color: 'Black', image: '../../public/images/spade9.jpg' },
  { id: 'card-49', suit: 'Spades', rank: '10', color: 'Black', image: '../../public/images/spade10.jpg' },
  { id: 'card-50', suit: 'Spades', rank: 'Jack', color: 'Black', image: '../../public/images/spadeJ.jpg' },
  { id: 'card-51', suit: 'Spades', rank: 'Queen', color: 'Black', image: '../../public/images/spadeQ.jpg' },
  { id: 'card-52', suit: 'Spades', rank: 'King', color: 'Black', image: '../../public/images/spadeK.jpg' },
];

// create and initialize Foundation decks with suit id, and empty 
const initialDecks = [
  { id: 'Spades', cards: [] },
  { id: 'Diamonds', cards: [] },
  { id: 'Clubs', cards: [] },
  { id: 'Hearts', cards: [] },
];

// Emoji on empty foundation decks
const suitEmojis = {
  Spades: '♤',
  Diamonds: '♢',
  Clubs: '♧',
  Hearts: '♡',
};

// Initial tableau cards with stacks (adjust as needed)
const initialTableau = Array.from({ length: 7 }, (_, index) => ({
  id: `tableau-${index + 1}`,
  cards: [],
  faceUp: [], // Array to track faceup cards
}));

const Solitaire = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [decks, setDecks] = useState(initialDecks);
  /* for next card display */
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [tableau, setTableau] = useState(initialTableau); // State for tableau cards
  const [viewHighscores, setViewHighscores] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
 
    // Timer logic -------------------------------------------
    useEffect(() => {
      let interval;
  
      if (timerActive) {
        interval = setInterval(() => {
          setTimeInSeconds((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [timerActive]);
  
    // Reset timer when game starts or restarts
    useEffect(() => {
      if (gameStarted) {
        setTimeInSeconds(0);
        setTimerActive(true);
      } else {
        setTimerActive(false);
      }
    }, [gameStarted]);

    useEffect(() => {
      if (checkGameWon()) {
        alert('Congratulations! You have won the game!');
      }
    }, [decks]); // Listen for changes in the foundation decks

    // --------- -------------------------------------------

  useEffect(() => {
    const shuffledCards = shuffleArray([...initialCards]);

    // Distribute cards between tableau and stockpile
    let tableauCopy = initialTableau.map((pile) => ({ ...pile, cards: [] }));
    let stockpile = [];

    for (let i = 0; i < tableauCopy.length; i++) {
      for (let j = 0; j <= i; j++) {
        const card = shuffledCards.shift();
        tableauCopy[i].cards.push(card);
        tableauCopy[i].faceUp.push(j === i); // Set face-up only for the top card in each pile
      }
    }
    stockpile = shuffledCards;
    setTableau(tableauCopy);
    setCards(stockpile);
  }, []);

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // cycling through cards in stockpile
  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // from Start to Game
  const handleStartGame = () => {
    setGameStarted(true);
  };

// From Game to Start
const handleExitGame = () => {
  setGameStarted(false);
};

// reiterates the initial game state

const handleRestartGame = () => {
  // Reset cards
  const shuffledCards = shuffleArray([...initialCards]);
  let tableauCopy = initialTableau.map((pile) => ({ ...pile, cards: [], faceUp: pile.faceUp.map(() => false) }));
  let stockpile = [];
  for (let i = 0; i < tableauCopy.length; i++) {
    for (let j = 0; j <= i; j++) {
      const card = shuffledCards.shift();
      tableauCopy[i].cards.push(card);
      tableauCopy[i].faceUp[j] = (j === i); // Set face-up only for the top card in each pile
    }
  }
  stockpile = shuffledCards;
  setTableau(tableauCopy);
  setCards(stockpile);
  setDecks(initialDecks);
  setTimeInSeconds(0); // Reset the timer
  setTimerActive(true); // Start the timer
};

  // from Start to Highscores
  const handleHighscores = () => {
    setViewHighscores(true);
  };

  //-----------------------------------(F1) drag ANY TO FOUNDATION RULES -------------------------------------------------

  // Check if the move is valid to the foundation
  const handleFoundationDrop = (source, destination, draggedCard) => {
    const targetFoundation = decks.find((deck) => deck.id === destination.droppableId);

    if (!targetFoundation) return;

    const isMoveValid = isMoveAllowed(draggedCard, targetFoundation);

    if (!isMoveValid) {
      // Move is invalid, return to beginning of stockpile array
      //setCards((prevCards) => [draggedCard, ...prevCards]); 
      return; // go to next card in array
    }

    if (source.droppableId === 'revealed-cards') {
      const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
      setCards(updatedCards);
    } else {
      let updatedTableau = tableau.map((pile) => ({
        ...pile,
        cards: pile.id === source.droppableId ? pile.cards.filter((_, index) => index !== source.index) : pile.cards,
      }));
      setTableau(updatedTableau);
    }

    const updatedDecks = decks.map((deck) => ({
      ...deck,
      cards: deck.id === destination.droppableId ? [...deck.cards, draggedCard] : deck.cards,
    }));

    setDecks(updatedDecks);
  };

  // Function to validate if card can be moved to foundation
  const isMoveAllowed = (card, foundationDeck) => {
    if (foundationDeck.cards.length === 0) {
      // Only Ace can be placed on an empty foundation
      return card.rank === 'Ace' && card.suit === foundationDeck.id;
    } else {
      const lastCard = foundationDeck.cards[foundationDeck.cards.length - 1];
      // Allow rank 2 of the same suit to be placed on Ace
      if (lastCard.rank === 'Ace' && card.rank === '2' && card.suit === foundationDeck.id) {
        return true;
      }
      // Check if ranks are in ascending order and same suit
      if (card.suit === foundationDeck.id && getNextRank(lastCard.rank) === card.rank) {
        return true;
      }

      // Allow cards to drop in sequence using parseInt
      const lastRankInt = parseInt(lastCard.rank, 10); // Parse the rank of the last card as an integer
      const currentRankInt = parseInt(card.rank, 10); // Parse the rank of the current card as an integer

      if (!isNaN(lastRankInt) && !isNaN(currentRankInt) && currentRankInt === lastRankInt + 1 && card.suit === foundationDeck.id) {
        return true;
      }

      return false;
    }
  };

  // Function to get the next rank in sequence
  const getNextRank = (rank) => {
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const currentIndex = ranks.indexOf(rank);
    return ranks[currentIndex + 1];
  };

  //-----------------------------------(S1) drag STOCKPILE TO TABLEAU RULES -------------------------------------------------

  const handleStockpileToTableauDrop = (draggedCard, destination) => {
    const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
    setCards(updatedCards);

    console.log(`Dragging card ${draggedCard.rank} of ${draggedCard.suit} to destination: ${destination.droppableId}`);

    if (destination.droppableId.startsWith('tableau')) {
      const targetPileId = destination.droppableId;
      const targetPile = tableau.find((pile) => pile.id === targetPileId);

      if (!targetPile) {
        console.error(`Error: Tableau pile ${targetPileId} not found.`);
        return;
      }

      const topCard = targetPile.cards.length > 0 ? targetPile.cards[targetPile.cards.length - 1] : null;

      // Check if dragged card rank is valid
      const isValidRank = () => {
        const ranks = ['King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'Ace'];
        const draggedCardIndex = ranks.indexOf(draggedCard.rank);
        if (topCard === null) {
          // If the pile is empty, only a King can be dropped
          return draggedCard.rank === 'King';
        } else {
          const topCardIndex = ranks.indexOf(topCard.rank);
          return draggedCardIndex === topCardIndex + 1;
        }
      };

      // Check if dragged card color is valid (opposite color)
      const isValidColor = () => {
        if (!topCard) return true; // If no top card, any color is valid
        return (topCard.color === 'Red' && draggedCard.color === 'Black') || (topCard.color === 'Black' && draggedCard.color === 'Red');
      };

      if (isValidRank() && isValidColor()) {
        // Add the card to the tableau pile and mark it as faceup
        const updatedTableau = tableau.map((pile) => {
          if (pile.id === targetPileId) {
            // Mark the added card faceup and retain other cards' face-up state
            const updatedFaceUp = [...pile.faceUp, true];
            console.log(`Card ${draggedCard.rank} of ${draggedCard.suit} added to tableau ${targetPileId}. New faceup state: ${updatedFaceUp}`);
            return {
              ...pile,
              cards: [...pile.cards, draggedCard],
              faceUp: updatedFaceUp,
            };
          }
          return pile;
        });
        setTableau(updatedTableau);
      } else {
        console.log('Invalid move: Cannot drop this card on top of the current tableau pile.');
      }
    } else {
      console.log('Invalid destination: Destination must be a tableau pile.');
    }
  };

  //----------------------------------- (T1) drag TABLEAU TO TABLEAU RULES -------------------------------------------------

  const handleTableauToTableauDrop = (source, destination) => {
    // Find indices of source and destination piles in the tableau
    const sourcePileIndex = tableau.findIndex((pile) => pile.id === source.droppableId);
    const destinationPileIndex = tableau.findIndex((pile) => pile.id === destination.droppableId);

    if (sourcePileIndex !== -1 && destinationPileIndex !== -1) {
      // Clone tableau to avoid mutating state directly
      const updatedTableau = [...tableau];
      const sourcePile = updatedTableau[sourcePileIndex];
      const destinationPile = updatedTableau[destinationPileIndex];

      // Extract dragged group of cards from source pile
      const draggedGroup = sourcePile.cards.slice(source.index);

      // Remove cards from source pile
      sourcePile.cards = sourcePile.cards.filter((_, index) => index < source.index);

      // Validate if the dragged cards can be placed on the destination pile
      const isTableauValidMove = () => {
        const topCard = destinationPile.cards.length > 0 ? destinationPile.cards[destinationPile.cards.length - 1] : null;
        const draggedCard = draggedGroup[0]; // We only validate the top card of the dragged group

        // Check if dragged card rank is valid
        const isValidRank = () => {
          const ranks = ['King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'Ace'];
          const draggedCardIndex = ranks.indexOf(draggedCard.rank);
          if (!topCard) {
            // If the pile is empty, only a King can be dropped
            return draggedCard.rank === 'King';
          } else {
            const topCardIndex = ranks.indexOf(topCard.rank);
            return draggedCardIndex === topCardIndex + 1;
          }
        };

        // Check if dragged card color is valid (opposite color)
        const isValidColor = () => {
          if (!topCard) return true; // If no top card, any color is valid
          return (topCard.color === 'Red' && draggedCard.color === 'Black') || (topCard.color === 'Black' && draggedCard.color === 'Red');
        };

        return isValidRank() && isValidColor();
      };

      if (isTableauValidMove()) {
        // Remember current faceUp state
        const currentFaceUpState = [...destinationPile.faceUp];

        // Insert cards into destination pile
        destinationPile.cards.splice(destination.index, 0, ...draggedGroup);

        // Update face-up state for all cards in the destination pile
        destinationPile.faceUp = destinationPile.cards.map((_, index) => {
          // Preserve existing face-up state if it was true before the drop
          if (index < currentFaceUpState.length && currentFaceUpState[index]) {
            return true;
          }
          // Otherwise, set face-up state for newly added cards
          return index >= destination.index;
        });

        // Log added card and new faceup state
        console.log(`Card ${draggedGroup[0].rank} of ${draggedGroup[0].suit} added to tableau ${destinationPile.id}.`);
        console.log(`New faceup state: ${destinationPile.faceUp}`);

        // Update tableau state only on valid move
        setTableau(updatedTableau);
      } else {
        // Restore cards to the source pile on invalid move
        sourcePile.cards.splice(source.index, 0, ...draggedGroup);

        // Update tableau state regardless to reflect the restored cards
        setTableau(updatedTableau);

        console.log('Invalid move: Cannot drop this card on top of the current tableau pile.');
      }
    }
  };

  // --------------------------- ON DRAG END (collective index for separate DnD functions) ------------------->

  const onDragEnd = (result) => {
    console.log('Drag result:', result); // Log the entire drag result object
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Retrieve the dragged card
    let draggedCard;

    if (source.droppableId === 'revealed-cards') {
      draggedCard = cards[currentCardIndex];
    } else {
      const sourcePile = tableau.find((pile) => pile.id === source.droppableId);
      draggedCard = sourcePile?.cards[source.index];
    }

    // (S1.1) DROPPING FROM STOCKPILE INTO TABLEAU -----------------------------------------

    if (source.droppableId === 'revealed-cards') {
      const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
      setCards(updatedCards);

      handleStockpileToTableauDrop(draggedCard, destination);

      // (T1.1) DROPPING FROM TABLEAU INTO TABLEAU -----------------------------------------

    } else if (source.droppableId.startsWith('tableau') && destination.droppableId.startsWith('tableau')) {
      handleTableauToTableauDrop(source, destination);
    }
    // (F.1) DROPPING FROM ANY INTO FOUNDATION ------------------------------------------

    handleFoundationDrop(source, destination, draggedCard);
  };

/* -------------------------- check if game won -----------------------------------*/

const checkGameWon = () => {
  return decks.every((deck) => {
    // Check if all ranks from Ace to King are in the foundation deck
    const requiredCards = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const deckCards = deck.cards.map((card) => card.rank);

    return requiredCards.every((rank) => deckCards.includes(rank));
  });
};

if (checkGameWon()) {
  alert('Congratulations! You have won the game!');
}


/* -------------------------- check if game won -----------------------------------*/

if (viewHighscores) {
  return <Highscores />;
}

/* -------------------------- RETURN/RENDERING -----------------------------------*/

  return (
<div className='main-game-container'>
{ !gameStarted && <StartScreen onStartGame={handleStartGame} onHighScores={handleHighscores} /> }

      {gameStarted && (
        <div>

{/* --------------- game exit and restart btns ----------------*/}
        <div className="button-wrapper">
        <button className="game-button restart-game" onClick={handleRestartGame}>Restart</button>
        <button className="game-button exit-game" onClick={handleExitGame}>Exit</button>
      </div>

      <div className="timer">{formatTime(timeInSeconds)}</div>
 
{/* --------------- --------------------- -----------------------*/}

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="s-container">

        {/* Facedown stockpile section */}
        <div className="facedown-stockpile">

          {cards.slice(currentCardIndex + 1).map((card, index) => (
            <div key={card.id} className="facedown-card">
              <img src={cardBack} alt="Facedown card" />
            </div>
          ))}
        </div>

{/* Visible only on final card ---------------------------------------*/}

        {cards.slice(currentCardIndex + 1).length === 0 && (
          <div className="last-card-container">
            <div className="last-card-content">
              <img className='refresh' src="https://img.icons8.com/matisse/100/rotate.png" alt="rotate" />
            </div>
          </div>
        )}

{/* ------------------------------------------------------------------ */}

        <div className="cards">

          <Droppable droppableId="revealed-cards">
            {(provided) => (
              <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
                {currentCardIndex < cards.length && (
                  <Draggable draggableId={cards[currentCardIndex].id} index={currentCardIndex}>
                    {(dragProvided) => (
                      <div
                        className="card"
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        ref={dragProvided.innerRef}
                      >
                        <img
                          src={cards[currentCardIndex].image}
                          alt={`${cards[currentCardIndex].rank} of ${cards[currentCardIndex].suit}`}
                        />
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>


{/* Foundation decks section ---------------------------------------------------------------------*/}

        <div className="decks">
          <div className="foundation-decks">
            {decks.map((deck) => (
              <div key={deck.id} className="foundation-deck">
                <Droppable droppableId={deck.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`deck-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {deck.cards.length === 0 ? (
                        <div
                          className={`empty-deck-emoji ${deck.id === 'Hearts' || deck.id === 'Diamonds' ? 'emoji-red' : 'emoji-blue'
                            }`}
                        >
                          {suitEmojis[deck.id]}
                        </div>
                      ) : (
                        deck.cards.map((card, index) => (
                          <div key={card.id} className="card-in-deck">
                            <img src={card.image} alt={`${card.rank} of ${card.suit}`} />
                          </div>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>

        <div className="card-navigation">
          <button className='next-card-btn' onClick={nextCard}>Next Card</button>
        </div>

{/* Tableau decks section ---------------------------------------------------------------------*/}

        <div className="tableau">
          <div className="tableau-cards">
            {tableau.map((pile) => (
              <div key={pile.id} className="tableau-pile">
                <Droppable droppableId={pile.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`tableau-inner ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pile.cards.map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={card.id}
                          index={index}
                          isDragDisabled={!pile.faceUp[index]} // Disable dragging for face-down cards
                        >
                          {(dragProvided, dragSnapshot) => (
                            <div
                              className={`tableau-card ${dragSnapshot.isDragging ? 'group-dragging' : ''}`}
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                            >
                              {/* Render individual card when not dragging, group when dragging */}
                              {dragSnapshot.isDragging && pile.faceUp[index] ? (
                                // Render group of face-up cards being dragged
                                <div className='t-drag-card'>
                                  {pile.cards.slice(index).map((c, index) => (
                                    <div className='t-drag-card-group' key={c.id}>
                                      <img src={c.image} alt={`${c.rank} of ${c.suit}`} />
                                      {/*  {c.rank} of {c.suit} - ({c.color})  */}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div
                                  className="tableau-card-inner"
                                  onClick={() => {
                                    if (!pile.faceUp[index] && index === pile.cards.length - 1) {
                                      const updatedTableau = [...tableau];
                                      updatedTableau.forEach((p) => {
                                        if (p.id === pile.id) {
                                          p.faceUp[index] = true;
                                        }
                                      });
                                      setTableau(updatedTableau);
                                    }
                                  }}
                                >
                                  <img
                                    src={pile.faceUp[index] ? card.image : cardBack}
                                    alt={pile.faceUp[index] ? `${card.rank} of ${card.suit}` : 'Face-down card'}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
        

      </div>
    </DragDropContext>
    </div>
  )}


    </div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export default Solitaire;