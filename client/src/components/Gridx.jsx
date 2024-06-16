import { useState, useEffect } from 'react';
import '../App.css'; // Assuming App.css is your stylesheet for styling

const Grid = () => {
  const rows = 5;
  const cols = 5;

  // STEP ONE: Function to generate initial grid with cells containing id and active properties
  const generateInitialGrid = () => {
    return Array(rows).fill().map((row, rowIndex) =>
      Array(cols).fill().map((cell, colIndex) => ({
        id: rowIndex * cols + colIndex + 1,
        active: true, // true means cell is active (clickable)
        content: null
      }))
    );
  };

  // State to hold the grid and manage updates
  const [grid, setGrid] = useState(generateInitialGrid());

  // Function to handle cell click
  const handleClick = (row, col) => {
    if (grid[row][col].active) {
      const newGrid = [...grid];
      if (newGrid[row][col].content === 'X') {
        newGrid[row][col].content = '💣'; // Change 'X' to bomb
      
////////// game over if bomb clicked:////////////
        setGrid(newGrid); // Update the state with the new grid
        setTimeout(() => {
          alert('You clicked a bomb! Game over.'); // Alert after displaying bomb emoji
          generateNewGrid(); // Reset the grid after game over
        }, 500);
//////////////////////////////////
      } else {
        newGrid[row][col].content = newGrid[row][col].id.toString();
      }
      newGrid[row][col].active = false;
      setGrid(newGrid);
    }
  };

  // Function to generate new random 'X' cells and update the grid
  const generateNewGrid = () => {
    const newGrid = generateInitialGrid();

    // Randomly select three cells and mark them as 'X'
    const randomCells = [];
    while (randomCells.length < 3) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      if (!randomCells.some(cell => cell.row === randomRow && cell.col === randomCol)) {
        randomCells.push({ row: randomRow, col: randomCol });
      }
    }

    randomCells.forEach(cell => {
      newGrid[cell.row][cell.col].content = 'X';
    });

    // Function to check adjacent cells (including diagonals) and modify their id
    const updateAdjacentCells = (row, col) => {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],  // Diagonals and Up
        [0, -1],           [0, 1],   // Left and Right
        [1, -1],  [1, 0],   [1, 1]    // Diagonals and Down
      ];

      directions.forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const adjacentCell = newGrid[newRow][newCol];
          if (adjacentCell.content === null) {
            adjacentCell.id += 'a';
          }
        }
      });
    };

    // Iterate through the new grid to update adjacent cells
    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.content === 'X') {
          updateAdjacentCells(rowIndex, colIndex);
        }
      });
    });

    setGrid(newGrid);
  };

  return (
    <div>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${!cell.active ? 'inactive' : ''}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell.content}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={generateNewGrid}>Restart</button>
    </div>
  );
};

export default Grid;