import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchBar from './SearchBar'
import weatherData from '../../__mocks__/mock-data.js'

const singleHourWeatherData = weatherData.hourly[0];
const mockHandleClick = jest.fn(_ => true);

test('renders SearchBar', () => {
 render( <SearchBar handleClick={mockHandleClick}/>)

  const searchInputElement = screen.getByPlaceholderText('Search City', {exact: false});
  const logoElement = screen.getByAltText('Sweater Weather App logo', {exact: true});
  const buttonElement = screen.getByText('Get Weather', {exact: false});
  
  expect(searchInputElement).toBeDefined();
  expect(logoElement).toBeDefined();
  expect(buttonElement).toBeDefined();
})