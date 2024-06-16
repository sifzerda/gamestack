import { useState, useEffect } from 'react';
import '../App.css'; // Assuming App.css is your stylesheet for styling

const Grid = () => {
  const rows = 5;
  const cols = 5;

  // Initialize grid with cells containing id and active properties
  const initialGrid = Array(rows).fill().map((row, rowIndex) =>
    Array(cols).fill().map((cell, colIndex) => ({
      id: rowIndex * cols + colIndex + 1,
      active: true, // true means cell is active (clickable)
      content: null
    }))
  );

  // State to hold the grid and manage updates
  const [grid, setGrid] = useState(initialGrid);

  // Function to handle cell click
  const handleClick = (row, col) => {
    if (grid[row][col].active) {
      // Update grid to display cell's id and mark it as inactive
      const newGrid = [...grid];
      newGrid[row][col].content = newGrid[row][col].id.toString();
      newGrid[row][col].active = false;
      setGrid(newGrid);
    }
  };

  // Effect to randomly select three cells and mark them as 'X'
  useEffect(() => {
    const randomCells = [];
    while (randomCells.length < 3) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      if (!randomCells.some(cell => cell.row === randomRow && cell.col === randomCol)) {
        randomCells.push({ row: randomRow, col: randomCol });
      }
    }

    // Update grid to mark selected cells with 'X'
    const newGrid = [...grid];
    randomCells.forEach(cell => {
      newGrid[cell.row][cell.col].content = 'X';
    });

    // Function to check adjacent cells (including diagonals) and modify their id
    const updateAdjacentCells = (row, col) => {
      const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
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

    // Iterate through the grid to update adjacent cells
    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.content === 'X') {
          updateAdjacentCells(rowIndex, colIndex);
        }
      });
    });

    setGrid(newGrid);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
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
  );
};

export default Grid;