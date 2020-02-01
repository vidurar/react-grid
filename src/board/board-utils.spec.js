import {
  defaultBoard,
  calculateConnectedSquares,
  calculateConnectedCoordinates,
  generateMatrix
} from "./board-utils";

describe("calculateConnectedSquares", () => {
  it("should calculate correct amount of connected squares for a given coordinate", () => {
    expect(
      calculateConnectedSquares(defaultBoard, 1, 1, defaultBoard.length)
    ).toBe(4);
    expect(
      calculateConnectedSquares(defaultBoard, 4, 0, defaultBoard.length)
    ).toBe(3);
    expect(
      calculateConnectedSquares(defaultBoard, 2, 4, defaultBoard.length)
    ).toBe(2);
    expect(
      calculateConnectedSquares(defaultBoard, 0, 4, defaultBoard.length)
    ).toBe(1);
  });

  it("should ignore squares that are connected diagonally when counting", () => {
    const boardWithDiagonallyConnectedSquares = [
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ];

    expect(
      calculateConnectedSquares(
        boardWithDiagonallyConnectedSquares,
        0,
        4,
        defaultBoard.length
      )
    ).toBe(1);
    expect(
      calculateConnectedSquares(
        boardWithDiagonallyConnectedSquares,
        1,
        3,
        defaultBoard.length
      )
    ).toBe(3);
  });
});

describe("calculateConnectedCoordinates", () => {
  it("should calculate correct coordiantes of connected squares for a given coordinate", () => {
    expect(
      calculateConnectedCoordinates(defaultBoard, 1, 1, defaultBoard.length)
    ).toStrictEqual({ "1-0": true, "1-1": true, "2-0": true, "2-1": true });
    expect(
      calculateConnectedCoordinates(defaultBoard, 4, 0, defaultBoard.length)
    ).toStrictEqual({ "4-0": true, "4-1": true, "4-2": true });
    expect(
      calculateConnectedCoordinates(defaultBoard, 2, 4, defaultBoard.length)
    ).toStrictEqual({ "2-3": true, "2-4": true });
    expect(
      calculateConnectedCoordinates(defaultBoard, 0, 4, defaultBoard.length)
    ).toStrictEqual({ "0-4": true });
  });

  it("should ignore squares that are connected diagonally when gathering coordinates", () => {
    const boardWithDiagonallyConnectedSquares = [
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ];

    expect(
      calculateConnectedCoordinates(
        boardWithDiagonallyConnectedSquares,
        0,
        4,
        defaultBoard.length
      )
    ).toStrictEqual({ "0-4": true });
    expect(
      calculateConnectedCoordinates(
        boardWithDiagonallyConnectedSquares,
        1,
        3,
        defaultBoard.length
      )
    ).toStrictEqual({ "1-3": true, "2-3": true, "2-4": true });
  });
});

describe("generateMatrix", () => {
  const boardSize = 7;
  const generatedArray = generateMatrix(boardSize);
  it("should generate 2d array", () => {
    expect(generatedArray.length).toStrictEqual(boardSize);
  });
  it("should contain randomly generated 0s and 1s", () => {
    generatedArray.map(row => row.every(value => [1, 0].includes(value)));
  });
});
