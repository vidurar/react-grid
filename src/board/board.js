import React, { useState } from "react";
import styles from "./board.module.css";

export const calculateConnectedSquares = (
  board,
  row,
  col,
  gridSize,
  visited = {}
) => {
  let coordinates = `${row},${col}`;

  if (board[row][col] === 1 && visited[coordinates] === undefined) {
    let count = 1;
    visited[coordinates] = true;
    for (let newRow = row - 1; newRow <= row + 1; newRow++) {
      for (let newCol = col - 1; newCol <= col + 1; newCol++) {
        if (
          newRow < gridSize &&
          newRow >= 0 &&
          newCol < gridSize &&
          newCol >= 0
        ) {
          count += calculateConnectedSquares(
            board,
            newRow,
            newCol,
            gridSize,
            visited
          );
        }
      }
    }
    return count;
  } else {
    return 0;
  }
};

export const defaultBoard = [
  [0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0]
];

export const Board = () => {
  const board = defaultBoard;
  const [clickedSquare, setClickedSquare] = useState(null);
  const [
    connectedSquaresCountOfClickedSquare,
    setConnectedSquaresCountOfClickedSquare
  ] = useState(null);

  const renderLabel = (rowIndex, columnIndex) => {
    if (
      clickedSquare &&
      connectedSquaresCountOfClickedSquare > 0 &&
      clickedSquare.rowIndex === rowIndex &&
      clickedSquare.columnIndex === columnIndex
    ) {
      return connectedSquaresCountOfClickedSquare;
    }
    return null;
  };

  return (
    <div className={styles.container} data-testid="board">
      {board.map((row, rowIndex) => (
        <div className={styles["board-row"]} key={rowIndex}>
          {row.map((value, columnIndex) => (
            <button
              key={`${rowIndex}-${columnIndex}`}
              data-testid={`${rowIndex}-${columnIndex}`}
              className={value === 1 ? styles["red-square"] : styles.square}
              onClick={() => {
                const connectedComponentCount = calculateConnectedSquares(
                  board,
                  rowIndex,
                  columnIndex,
                  board.length
                );
                setConnectedSquaresCountOfClickedSquare(
                  connectedComponentCount
                );
                setClickedSquare({ rowIndex, columnIndex });
              }}
            >
              {renderLabel(rowIndex, columnIndex)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
