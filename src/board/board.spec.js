import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board, { defaultBoard, calculateConnectedSquares } from "./board";

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
});

describe("Board", () => {
  let rendered;
  beforeEach(() => {
    rendered = render(<Board />);
  });

  it("should render without crashing", () => {
    expect(rendered.getByTestId("board")).toBeInTheDocument();
  });

  it("should display amount of connected red squares when clicking on correct index", () => {
    fireEvent.click(rendered.getByTestId("1-1"));
    expect(rendered.getByText("4")).toBeInTheDocument();

    fireEvent.click(rendered.getByTestId("4-0"));
    expect(rendered.getByText("3")).toBeInTheDocument();

    fireEvent.click(rendered.getByTestId("2-4"));
    expect(rendered.getByText("2")).toBeInTheDocument();

    fireEvent.click(rendered.getByTestId("0-4"));
    expect(rendered.getByText("1")).toBeInTheDocument();
  });
});
