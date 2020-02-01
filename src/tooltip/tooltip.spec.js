import React from "react";
import { render } from "@testing-library/react";
import Tooltip from "./tooltip";

const createTestProps = custom => ({
  ...custom
});

describe("rendering", () => {
  const props = createTestProps();
  const rendered = render(<Tooltip {...props} />);
  it("should render without crashing", () => {
    expect(rendered.queryByText("React Grid Project")).toBeInTheDocument();
  });
});
