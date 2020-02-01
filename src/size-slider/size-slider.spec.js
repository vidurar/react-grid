import React from "react";
import { render } from "@testing-library/react";
import SizeSlider from "./size-slider";

const createTestProps = custom => ({
  boardSize: 5,
  onChange: jest.fn(),
  ...custom
});

describe("rendering", () => {
  const props = createTestProps();
  const rendered = render(<SizeSlider {...props} />);
  it("should render without crashing", () => {
    expect(rendered.queryByTestId("board-size-slider")).toBeInTheDocument();
  });
});
