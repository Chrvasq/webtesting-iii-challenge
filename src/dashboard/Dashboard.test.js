import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../dashboard/Dashboard";

afterEach(cleanup);

describe("<Dashboard/>", () => {
  it("renders control and display", () => {
    const { getByText } = render(<Dashboard />);

    expect(getByText(/open/i)).toBeTruthy();
    expect(getByText(/unlocked/i)).toBeTruthy();
    expect(getByText(/close gate/i)).toBeTruthy();
    expect(getByText(/lock gate/i)).toBeTruthy();
  });
});
