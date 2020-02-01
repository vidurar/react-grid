import React, { useState } from "react";
import styles from "./board.module.css";

const isUndefined = value => typeof value === "undefined";

const isDiagonalToPrevCoordinates = (row, col, prevRow, prevCol) => {
  return (
    !isUndefined(prevRow) &&
    !isUndefined(prevCol) &&
    row !== prevRow &&
    col !== prevCol
  );
};

export const calculateConnectedSquares = (
  board,
  row,
  col,
  gridSize,
  visited = {},
  prevRow,
  prevCol
) => {
  let coordinates = `${row}-${col}`;

  if (
    board[row][col] === 1 &&
    visited[coordinates] === undefined &&
    !isDiagonalToPrevCoordinates(row, col, prevRow, prevCol)
  ) {
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
            visited,
            row,
            col
          );
        }
      }
    }
    return count;
  } else {
    return 0;
  }
};

export const calculateConnectedCoordinates = (
  board,
  row,
  col,
  gridSize,
  visited = {},
  prevRow,
  prevCol
) => {
  let coordinates = `${row}-${col}`;

  if (
    board[row][col] === 1 &&
    visited[coordinates] === undefined &&
    !isDiagonalToPrevCoordinates(row, col, prevRow, prevCol)
  ) {
    visited[coordinates] = true;
    for (let newRow = row - 1; newRow <= row + 1; newRow++) {
      for (let newCol = col - 1; newCol <= col + 1; newCol++) {
        if (
          newRow < gridSize &&
          newRow >= 0 &&
          newCol < gridSize &&
          newCol >= 0
        ) {
          calculateConnectedCoordinates(
            board,
            newRow,
            newCol,
            gridSize,
            visited,
            row,
            col
          );
        }
      }
    }
    return visited;
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

const generateMatrix = size => {
  var arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = [];
    for (let j = 0; j < size; j++) {
      arr[i][j] = Math.round(Math.random());
    }
  }
  return arr;
};

export const Board = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [board, setBoard] = useState(defaultBoard);
  const [clickedSquare, setClickedSquare] = useState(null);
  const [connectedCoordinates, setConnectedCoordinates] = useState([]);
  const [
    connectedSquaresCountOfClickedSquare,
    setConnectedSquaresCountOfClickedSquare
  ] = useState(null);
  const DEFAULT_SQUARE_BACKGROUND_COLOR = "#ffffff";
  const [
    activeSquareBackgroundColor,
    setActiveSquareBackgroundColor
  ] = useState("#ff0000");
  const [
    activeSquareHoverBackgroundColor,
    setActiveSquareHoverBackgroundColor
  ] = useState("#ffa500");

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

  const getButtonBackgroundColor = (value, key) => {
    if (connectedCoordinates.includes(key))
      return activeSquareHoverBackgroundColor;
    if (value === 1) return activeSquareBackgroundColor;
    return DEFAULT_SQUARE_BACKGROUND_COLOR;
  };

  return (
    <div className={styles.container} data-testid="board">
      <div className={styles.slidecontainer}>
        {`Board Size: ${boardSize}`}
        <input
          type="range"
          min="4"
          max="7"
          value={boardSize}
          className={styles.slider}
          onChange={event => {
            setBoardSize(event.target.value);
            setBoard(generateMatrix(event.target.value));
            setClickedSquare(null);
            setConnectedCoordinates([]);
          }}
        />
      </div>
      {board.map((row, rowIndex) => (
        <div className={styles["board-row"]} key={rowIndex}>
          {row.map((value, columnIndex) => (
            <button
              key={`${rowIndex}-${columnIndex}`}
              data-testid={`${rowIndex}-${columnIndex}`}
              className={styles.square}
              style={{
                background: getButtonBackgroundColor(
                  value,
                  `${rowIndex}-${columnIndex}`
                )
              }}
              onMouseEnter={() =>
                setConnectedCoordinates(
                  Object.keys(
                    calculateConnectedCoordinates(
                      board,
                      rowIndex,
                      columnIndex,
                      board.length
                    )
                  )
                )
              }
              onMouseLeave={() => setConnectedCoordinates([])}
              onClick={() => {
                setConnectedSquaresCountOfClickedSquare(
                  calculateConnectedSquares(
                    board,
                    rowIndex,
                    columnIndex,
                    board.length
                  )
                );
                setClickedSquare({ rowIndex, columnIndex });
              }}
            >
              {renderLabel(rowIndex, columnIndex)}
            </button>
          ))}
        </div>
      ))}
      <div>
        Pick resting background color of connected squares
        <input
          type="color"
          value={activeSquareBackgroundColor}
          onChange={event => setActiveSquareBackgroundColor(event.target.value)}
        />
      </div>
      <div>
        Pick active background color of connected squares
        <input
          type="color"
          value={activeSquareHoverBackgroundColor}
          onChange={event =>
            setActiveSquareHoverBackgroundColor(event.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Board;
