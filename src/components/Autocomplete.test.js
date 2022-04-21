import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Autocomplete from './Autocomplete'
import weatherData from '../../__mocks__/mock-data.js'

const mockHandleClick = jest.fn(_ => true);

test('renders Autocomplete', () => {
 render(<Autocomplete handleClick={mockHandleClick}/>)
 const searchInputElement = screen.getByPlaceholderText('Search City', {exact: false});
 const logoElement = document.getElementById("user-input-location-search");
 const buttonElement = screen.getByText('Get Weather', {exact: false});
 
 expect(searchInputElement).toBeDefined();
 expect(logoElement).toBeDefined();
 expect(buttonElement).toBeDefined();
})

