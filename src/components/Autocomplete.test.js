import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Autocomplete from "./Autocomplete";

const mockHandleClick = jest.fn(() => true);

test("renders Autocomplete", () => {
  render(<Autocomplete handleClick={mockHandleClick} />);
  const searchInputElement = screen.getByPlaceholderText("Search City", {
    exact: false,
  });
  const logoElement = document.getElementById("user-input-location-search");
  const buttonElement = screen.getByText("Get Weather", { exact: false });

  expect(searchInputElement).toBeDefined();
  expect(logoElement).toBeDefined();
  expect(buttonElement).toBeDefined();
});
