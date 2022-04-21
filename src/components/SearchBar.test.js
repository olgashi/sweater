import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

const mockHandleClick = jest.fn(() => true);

test("renders SearchBar", () => {
  render(<SearchBar handleClick={mockHandleClick} />);

  const searchInputElement = screen.getByPlaceholderText("Search City", {
    exact: false,
  });
  const logoElement = screen.getByAltText("Sweater Weather App logo", {
    exact: true,
  });
  const buttonElement = screen.getByText("Get Weather", { exact: false });

  expect(searchInputElement).toBeDefined();
  expect(logoElement).toBeDefined();
  expect(buttonElement).toBeDefined();
});
