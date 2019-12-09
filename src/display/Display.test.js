import React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./Display";
import Dashboard from "../dashboard/Dashboard";

afterEach(cleanup);

describe("Gate", () => {
  it('should default to "Unlocked" and "Open', () => {
    const { getByText } = render(<Display />);

    expect(getByText(/unlocked/i).textContent).toBe("Unlocked");
    expect(getByText(/open/i).textContent).toBe("Open");
  });

  it('cannot be "Closed" or "Opened" if it is "Locked"', () => {
    const { getByText } = render(<Dashboard />);

    //sanity check default is disabled
    expect(getByText(/lock gate/i)).toBeDisabled();

    act(() => {
      fireEvent.click(getByText(/close gate/i));
    });

    act(() => {
      fireEvent.click(getByText(/lock gate/i));
    });

    expect(getByText(/open gate/i)).toBeDisabled();
  });
});

describe("<Display/>", () => {
  it("displays if gate is open/closed and if it is locked/unlocked", () => {
    const { getByText } = render(<Dashboard />);

    act(() => {
      fireEvent.click(getByText(/close gate/i));
    });
    expect(getByText(/closed/i).textContent).toBe("Closed");

    act(() => {
      fireEvent.click(getByText(/lock gate/i));
    });
    expect(getByText(/locked/i).textContent).toBe("Locked");

    act(() => {
      fireEvent.click(getByText(/unlock gate/i));
    });
    expect(getByText(/unlocked/i).textContent).toBe("Unlocked");

    act(() => {
      fireEvent.click(getByText(/open gate/i));
    });
    expect(getByText(/open/i).textContent).toBe("Open");
  });

  it("displays 'Closed' if the `closed` prop is `true` and 'Open' if otherwise", () => {
    const { getByText, rerender } = render(<Display closed={true} />);
    expect(getByText(/closed/i).textContent).toBe("Closed");

    rerender(<Display closed={false} />);
    expect(getByText(/open/i).textContent).toBe("Open");
  });

  it("displays 'Locked' if the `locked` prop is `true` and 'Unlocked' if otherwise", () => {
    const { getByText, rerender } = render(<Display locked={true} />);
    expect(getByText(/locked/i).textContent).toBe("Locked");

    rerender(<Display locked={false} />);
    expect(getByText(/unlocked/i).textContent).toBe("Unlocked");
  });

  it("when `locked` or `closed` use the `red-led` class", () => {
    const { getByText } = render(<Display locked={true} closed={true} />);
    expect(getByText(/locked/i).className).toBe("led red-led");
    expect(getByText(/closed/i).className).toBe("led red-led");
  });

  it("when `unlocked` or `open` use the `green-led` class", () => {
    const { getByText } = render(<Display locked={false} closed={false} />);
    expect(getByText(/unlocked/i).className).toBe("led green-led");
    expect(getByText(/open/i).className).toBe("led green-led");
  });
});
