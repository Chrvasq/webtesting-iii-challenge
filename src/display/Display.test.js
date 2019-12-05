import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./Display";
import Dashboard from "../dashboard/Dashboard";

describe("<Display/>", () => {
  it("should match snapshot", () => {
    const wrapper = rtl.render(<Display />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should default to "Unlocked" and "Open', () => {
    const wrapper = rtl.render(<Display />);
    const element1 = wrapper.getByText(/unlocked/i);
    const element2 = wrapper.getByText(/open/i);

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  });

  it('cannot be "Closed" or "Opened" if it is "Locked"', () => {
    const wrapper = rtl.render(<Dashboard />);
    const element1 = wrapper.getByText(/lock gate/i);
    const element2 = wrapper.getByText(/close gate/i);

    //sanity check default is disabled
    expect(element1).toBeDisabled();

    rtl.act(() => {
      rtl.fireEvent.click(element2);
    });

    rtl.act(() => {
      rtl.fireEvent.click(element1);
    });

    expect(element2).toBeDisabled();
  });
});
