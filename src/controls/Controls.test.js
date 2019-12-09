import React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Controls from "../controls/Controls";
import Dashboard from "../dashboard/Dashboard";

afterEach(cleanup);

describe("<Controls/>", () => {
  it("provides buttons to toggle the `closed` and `locked` states.", () => {
    const { getByText } = render(<Controls />);

    expect(getByText(/close gate/i)).toBeTruthy();
    expect(getByText(/lock gate/i)).toBeTruthy();
  });

  it("buttons' text changes to reflect the state the door will be in if clicked", () => {
    const { getByText } = render(<Dashboard />);

    expect(getByText(/close gate/i).textContent).toBe("Close Gate");
    expect(getByText(/lock gate/i).textContent).toBe("Lock Gate");

    act(() => {
      fireEvent.click(getByText(/close gate/i));
    });
    expect(getByText(/open gate/i).textContent).toBe("Open Gate");

    act(() => {
      fireEvent.click(getByText(/lock gate/i));
    });
    expect(getByText(/unlock gate/i).textContent).toBe("Unlock Gate");
  });

  it("the closed toggle button is disabled if the gate is locked", () => {
    const { getByText } = render(<Dashboard />);

    act(() => {
      fireEvent.click(getByText(/close gate/i));
    });

    act(() => {
      fireEvent.click(getByText(/lock gate/i));
    });
    expect(getByText(/locked/i)).toBeTruthy();
    expect(getByText(/open gate/i)).toBeDisabled();
  });

  it("the locked toggle button is disabled if the gate is open", () => {
    const { getByText } = render(<Dashboard />);

    expect(getByText(/open/i)).toBeTruthy();
    expect(getByText(/lock gate/i)).toBeDisabled();
  });
});
