import React, { useState } from "react";
import SizeSlider from "../size-slider";
import ColorPicker from "../color-picker";
import Tooltip from "../tooltip";
import styles from "./board.module.css";
import {
  calculateConnectedCoordinates,
  calculateConnectedSquares,
  defaultBoard,
  generateMatrix
} from "./board-utils";

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
    connectedSquareBackgroundColor,
    setConnectedSquareBackgroundColor
  ] = useState("#ff0000");
  const [
    connectedSquareHoverBackgroundColor,
    setConnectedSquareHoverBackgroundColor
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
      return connectedSquareHoverBackgroundColor;
    if (value === 1) return connectedSquareBackgroundColor;
    return DEFAULT_SQUARE_BACKGROUND_COLOR;
  };

  return (
    <div className={styles.container}>
      <Tooltip />
      <SizeSlider
        boardSize={boardSize}
        onChange={event => {
          setBoardSize(Number(event.target.value));
          setBoard(generateMatrix(event.target.value));
          setClickedSquare(null);
          setConnectedCoordinates([]);
        }}
      />
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

      <ColorPicker
        label="Pick resting background color of connected squares: "
        testId="connected-color-input"
        value={connectedSquareBackgroundColor}
        onChange={event =>
          setConnectedSquareBackgroundColor(event.target.value)
        }
      />
      {/* <br /> */}
      <ColorPicker
        label="Pick active background color of connected squares: "
        testId="hover-color-input"
        value={connectedSquareHoverBackgroundColor}
        onChange={event =>
          setConnectedSquareHoverBackgroundColor(event.target.value)
        }
      />
    </div>
  );
};

Board.displayName = "Board";

export default Board;
