import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import NextSingleHour from './NextSingleHour'
import weatherData from '../../__mocks__/mock-data.js'
import { generateHourlyWeatherDataObj } from '../utils/general-utils'

const singleHourWeatherData = weatherData.hourly[0]

test('renders NextSingleHour', () => {
 render(<NextSingleHour {...generateHourlyWeatherDataObj({ nextHourDataObj: singleHourWeatherData, timezone: weatherData.timezone })}
 key={singleHourWeatherData.dt} 
 />)

   const lighRainTextElement = screen.getByText('Light Rain', {exact: false});
   const feelsLikeTextElement = screen.getByText('Feels Like: 43 F', {exact: false});
   const windTextElement = screen.getByText('Wind: 15 mph', {exact: false});
   
  expect(lighRainTextElement).toBeDefined();
  expect(feelsLikeTextElement).toBeDefined();
  expect(windTextElement).toBeDefined();
})