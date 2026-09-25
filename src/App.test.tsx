import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the heading and empty state', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'andrewkcl' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument()
    expect(screen.getByTestId('remaining')).toHaveTextContent('0 items remaining')
  })

  it('adds, toggles, and removes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New todo'), 'Ship the environment')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Ship the environment')).toBeInTheDocument()
    expect(screen.getByTestId('remaining')).toHaveTextContent('1 item remaining')

    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByTestId('remaining')).toHaveTextContent('0 items remaining')

    await user.click(
      screen.getByRole('button', { name: 'Remove Ship the environment' }),
    )
    expect(screen.queryByText('Ship the environment')).not.toBeInTheDocument()
    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument()
  })
})
