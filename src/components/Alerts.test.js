import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Alerts from './Alerts'
import weatherData from '../../__mocks__/mock-data.js'
import { getAlerts } from  '../utils/general-utils';
const alerts = getAlerts(weatherData);

test('renders Alerts', () => {
  render(<Alerts alerts={alerts} />)

  const element = screen.getByText('Warning! Alerts: Type: ...HEAT ADVISORY THIS EVENING...')
  expect(element).toBeDefined()
})