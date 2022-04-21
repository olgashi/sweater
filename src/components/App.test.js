import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Get Weather Button", () => {
  render(<App />);
  const button = screen.getByText("Get Weather");
  expect(button).toBeInTheDocument();
});
