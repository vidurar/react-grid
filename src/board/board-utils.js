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

export const generateMatrix = size => {
  var arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = [];
    for (let j = 0; j < size; j++) {
      arr[i][j] = Math.round(Math.random());
    }
  }
  return arr;
};
