import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import NextSingleDay from './NextSingleDay'
import weatherData from '../../__mocks__/mock-data.js'
import { generateDailyWeatherDataObj } from '../utils/general-utils'

const singleDayWeatherData = weatherData.daily[0]

test('renders NextSingleDay', () => {
 render(<NextSingleDay {...generateDailyWeatherDataObj({ dayDataObj: singleDayWeatherData, timezone: weatherData.timezone })}
 key={singleDayWeatherData.dt} 
 />)
   const lighRainTextElement = screen.getByText('Light Rain', {exact: false});
   const feelsLikeTextElement = screen.getAllByText('Feels Like', {exact: false});
   const highLowTextElement = screen.getByText('52/40F', {exact: false});
   const humidityTextElement = screen.getByText('Humidity', {exact: false});
   const uvIndexTextElement = screen.getByText('UV Index: 2.17 - Low', {exact: false});
   const cloudnessTextElement = screen.getByText('Cloudness: 100%', {exact: false});

  expect(lighRainTextElement).toBeDefined();
  expect(feelsLikeTextElement.length > 0).toBeTruthy();
  expect(highLowTextElement).toBeDefined();
  expect(humidityTextElement).toBeDefined();
  expect(uvIndexTextElement).toBeDefined();
  expect(cloudnessTextElement).toBeDefined();
})