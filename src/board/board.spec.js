import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
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

  describe("Rendering component", () => {
    it("should render without crashing", () => {
      expect(rendered.getByText("React Grid Project")).toBeInTheDocument();
    });

    it("should display array values of 1 with red background color", () => {
      expect(rendered.getByTestId("1-0")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
      expect(rendered.getByTestId("2-0")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
      expect(rendered.getByTestId("1-1")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
      expect(rendered.getByTestId("2-1")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );

      expect(rendered.getByTestId("4-0")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
      expect(rendered.getByTestId("4-1")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
      expect(rendered.getByTestId("4-2")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );

      expect(rendered.getByTestId("2-3")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
      expect(rendered.getByTestId("2-4")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );

      expect(rendered.getByTestId("0-4")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
    });
  });

  describe("When calculating connected squares", () => {
    it("should display amount of connected red (by default) squares when clicking on correct index", () => {
      fireEvent.click(rendered.getByTestId("1-1"));
      expect(rendered.getByText("4")).toBeInTheDocument();

      fireEvent.click(rendered.getByTestId("4-0"));
      expect(rendered.getByText("3")).toBeInTheDocument();

      fireEvent.click(rendered.getByTestId("2-4"));
      expect(rendered.getByText("2")).toBeInTheDocument();

      fireEvent.click(rendered.getByTestId("0-4"));
      expect(rendered.getByText("1")).toBeInTheDocument();
    });

    it("should display nothing when clicking on white square with '0' value", () => {
      fireEvent.click(rendered.getByTestId("1-0"));
      expect(rendered.queryByText("0")).not.toBeInTheDocument();
    });
  });
  describe("When hovering over connected squares", () => {
    it("should change color of connected squares to orange (by default)", () => {
      fireEvent.mouseOver(rendered.getByTestId("1-1"));

      expect(rendered.getByTestId("1-0")).toHaveStyle(
        "background: rgb(255, 165, 0);"
      );
      expect(rendered.getByTestId("2-0")).toHaveStyle(
        "background: rgb(255, 165, 0);"
      );
      expect(rendered.getByTestId("1-1")).toHaveStyle(
        "background: rgb(255, 165, 0);"
      );
      expect(rendered.getByTestId("2-1")).toHaveStyle(
        "background: rgb(255, 165, 0);"
      );
    });
  });

  describe("When adjusting board size", () => {
    it("should have default board size of 5", () => {
      fireEvent.mouseOver(rendered.getByText("Board Size: 5"));
      expect(rendered.queryByTestId("4-4")).toBeInTheDocument();
      expect(rendered.queryByTestId("5-0")).not.toBeInTheDocument();
    });

    it("should change board size upon input to slider", async () => {
      fireEvent.change(rendered.getByTestId("board-size-slider"), {
        target: { value: "6" }
      });

      await waitForElement(() => rendered.getByText("Board Size: 6"));
      expect(rendered.queryByTestId("5-0")).toBeInTheDocument();
    });
  });

  describe("When adjusting board colors", () => {
    it("should have default active square background color of red", () => {
      expect(rendered.getByTestId("1-0")).toHaveStyle(
        "background: rgb(255, 0, 0);"
      );
    });
    it("should have default active square on hover background color of orange", () => {
      fireEvent.mouseOver(rendered.getByTestId("1-1"));
      expect(rendered.getByTestId("1-0")).toHaveStyle(
        "background: rgb(255, 165, 0);"
      );
    });

    it("should be able to change connected square background color", () => {
      fireEvent.change(rendered.getByTestId("connected-color-input"), {
        target: { value: "#800000" }
      });
      expect(rendered.getByTestId("1-0")).toHaveStyle(
        "background: rgb(128, 0, 0);"
      );
    });

    it("should be able to change connected square on hover background color", () => {
      fireEvent.change(rendered.getByTestId("hover-color-input"), {
        target: { value: "#FFFF00" }
      });

      fireEvent.mouseOver(rendered.getByTestId("1-0"));
      expect(rendered.getByTestId("1-0")).toHaveStyle(
        "background: rgb(255, 255, 0);"
      );
    });
  });
});
