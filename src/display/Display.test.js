import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./Display";
import Dashboard from "../dashboard/Dashboard";

describe("Gate", () => {
  it("should match snapshot", () => {
    const wrapper = rtl.render(<Display />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should default to "Unlocked" and "Open', () => {
    const { getByText } = rtl.render(<Display />);

    expect(getByText(/unlocked/i)).toBeTruthy();
    expect(getByText(/open/i)).toBeTruthy();
  });

  it('cannot be "Closed" or "Opened" if it is "Locked"', () => {
    const { getByText } = rtl.render(<Dashboard />);

    //sanity check default is disabled
    expect(getByText(/lock gate/i)).toBeDisabled();

    rtl.act(() => {
      rtl.fireEvent.click(getByText(/close gate/i));
    });

    rtl.act(() => {
      rtl.fireEvent.click(getByText(/lock gate/i));
    });

    expect(getByText(/open gate/i)).toBeDisabled();
  });
});
