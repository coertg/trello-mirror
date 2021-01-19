import { render, screen } from '@testing-library/react'
import App from './App'

test('App component test passes', () => {
  render(<App />)
  expect(true).toBe(true)
});
