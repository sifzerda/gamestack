import  { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../App.css'; // global style
import '../solitaire.css';

import cardBack from '../../public/images/cardBack.jpg';
import heartA from '../../public/images/heartA.jpg';
import clubA from '../../public/images/clubA.jpg';
import diamondA from '../../public/images/diamondA.jpg';
import diamond2 from '../../public/images/diamond2.jpg';
import diamond3 from '../../public/images/diamond3.jpg';
import diamond4 from '../../public/images/diamond4.jpg';
import spadeA from '../../public/images/spadeA.jpg';

const StockPile = () => {
  const numberOfCards = 20;
  const topCardIndex = numberOfCards - 1;

  const [box1Clicked, setBox1Clicked] = useState(false);
  const [box2Visible, setBox2Visible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null); // Initialize with null for no image

  useEffect(() => {
    setBox2Visible(true);
  }, []);

  const handleClickBox1 = () => {
    setBox1Clicked(!box1Clicked);
    handleClickBox2();
  };

  const handleClickBox2 = () => {
    setCurrentImageIndex((currentImageIndex === null ? 0 : currentImageIndex + 1) % 7);
  };


  // Determine which image to display in Box 2 based on currentImageIndex
  const getImageForBox2 = () => {
    if (currentImageIndex === null) {
      return null; // Return null if currentImageIndex is null
    }
    switch (currentImageIndex) {
      case 0:
        return heartA;
      case 1:
        return clubA;
      case 2:
        return diamondA;
      case 3:
        return spadeA;
      case 4:
        return diamond2;
      case 5:
        return diamond3;
      case 6:
        return diamond4;
      default:
        return heartA; // Default to heartA.jpg if index is out of range
    }
  };

  return (
    <div className="card-stack-container">
      <h5>Stock Pile</h5>
      <div className="card-stack" onClick={handleClickBox1}>
        {Array.from({ length: numberOfCards }, (_, index) => (
          <div
            key={index}
            className="card"
            style={{
              zIndex: numberOfCards - index,
              transform: index === topCardIndex ? `translate(-5px, -5px)` : `none`,
            }}
          >
            <img src={cardBack} alt="Card Back" className="card-image" />
            <div className="card-index">{index + 1}</div>
          </div>
        ))}
      </div>

      {/* Render image for Box 2 */}
      {box2Visible && (
        <div className="card-shaped-box">
          <img src={getImageForBox2()} alt="Box 2 Image" className="card-image" />
        </div>
      )}

      <div className="card-stack-container">
        <h5>Foundations</h5>
        <div className="card-shaped-box">F 1</div>
        <div className="card-shaped-box">F 2</div>
        <div className="card-shaped-box">F 3</div>
        <div className="card-shaped-box">F 4</div>
      </div>
    </div>
  );
};

export default StockPile;