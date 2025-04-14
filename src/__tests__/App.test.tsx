import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock the setInterval function
jest.useFakeTimers();

describe('App Component', () => {
  beforeEach(() => {
    // Clear any previous timer mocks
    jest.clearAllTimers();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText("Conway's Game of Life")).toBeInTheDocument();
  });

  it('renders control buttons', () => {
    render(<App />);
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('renders pattern selector', () => {
    render(<App />);
    expect(screen.getByText('Select a pattern')).toBeInTheDocument();
  });

  it('toggles start/stop button text', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    
    // Click the start button
    fireEvent.click(startButton);
    expect(screen.getByText('Stop')).toBeInTheDocument();
    
    // Click the stop button
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('clears the grid when clear button is clicked', () => {
    render(<App />);
    
    // First select a pattern to populate the grid
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Glider' } });
    
    // Then clear the grid
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    // Check that the pattern description is no longer displayed
    // This is an indirect way to verify the grid was cleared
    expect(screen.queryByText(/A simple spaceship that moves diagonally/)).not.toBeInTheDocument();
  });

  it('displays pattern description when a pattern is selected', () => {
    render(<App />);
    
    // Select the Glider pattern
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Glider' } });
    
    // Check that the pattern description is displayed
    expect(screen.getByText(/A simple spaceship that moves diagonally/)).toBeInTheDocument();
  });

  it('renders the grid with cells', () => {
    render(<App />);
    
    // Check that the grid is rendered with cells
    const cells = document.querySelectorAll('.cell');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('toggles cell state when clicked', () => {
    render(<App />);
    
    // Find a cell and click it
    const cells = document.querySelectorAll('.cell');
    const cell = cells[0];
    
    // Initially the cell should not have the 'alive' class
    expect(cell).not.toHaveClass('alive');
    
    // Click the cell to toggle its state
    fireEvent.click(cell);
    
    // Now the cell should have the 'alive' class
    expect(cell).toHaveClass('alive');
    
    // Click again to toggle back
    fireEvent.click(cell);
    
    // The cell should no longer have the 'alive' class
    expect(cell).not.toHaveClass('alive');
  });
});