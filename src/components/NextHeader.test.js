import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import NextHeader from "./NextHeader";

test("renders Next header", () => {
  render(<NextHeader timeRangeAmount="5" timeRange="days" />);

  const element = screen.getByText("Next 5 days");
  expect(element).toBeDefined();
});
