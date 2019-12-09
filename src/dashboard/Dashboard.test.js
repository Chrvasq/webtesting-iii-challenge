import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../dashboard/Dashboard";

describe("<Dashboard/>", () => {
  it("renders control and display", () => {
    const { getByText } = rtl.render(<Dashboard />);

    expect(getByText(/open/i)).toBeTruthy();
    expect(getByText(/unlocked/i)).toBeTruthy();
    expect(getByText(/close gate/i)).toBeTruthy();
    expect(getByText(/lock gate/i)).toBeTruthy();
  });
});
