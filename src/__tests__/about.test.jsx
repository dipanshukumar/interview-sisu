import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Bptest from "../routes/Bptest.jsx";

describe("about", () => {
  test("renders about", () => {
    render(<Bptest />);
    expect(screen.getByText("Simulator Configuration")).toBeDefined();
    expect(
      screen.getByText(
        "Set the target values that ALL blood pressure readings will return:"
      )
    ).toBeDefined();
    expect(screen.getByText("Low")).toBeDefined();
    expect(screen.getByText("Normal")).toBeDefined();
    expect(screen.getByText("Elevated")).toBeDefined();
    expect(screen.getByText("High")).toBeDefined();
    expect(screen.getByText("Configure Simulator")).toBeDefined();
    expect(screen.getByText("Systolic Pressure")).toBeDefined();
    expect(screen.getByText("Diastolic Pressure")).toBeDefined();
    expect(screen.getByText("Heart Rate")).toBeDefined();
  });
});
