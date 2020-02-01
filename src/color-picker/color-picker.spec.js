import React from "react";
import { render } from "@testing-library/react";
import ColorPicker from "./color-picker";

const createTestProps = custom => ({
  label: "pick a color",
  testId: "color-picker",
  value: "#ffffff",
  onChange: jest.fn(),
  ...custom
});

describe("rendering", () => {
  const props = createTestProps();
  const rendered = render(<ColorPicker {...props} />);
  it("should render without crashing", () => {
    expect(rendered.queryByTestId("color-picker")).toBeInTheDocument();
  });
});
