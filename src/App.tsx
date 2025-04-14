import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { patterns, Pattern, getPatternGrid } from './patterns'

const GRID_SIZE = 50
const CELL_SIZE = 15
const SPEED = 100

type Grid = boolean[][]

function createEmptyGrid(): Grid {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false))
}

function countNeighbors(grid: Grid, x: number, y: number): number {
  let count = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue
      const newX = x + i
      const newY = y + j
      if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
        count += grid[newX][newY] ? 1 : 0
      }
    }
  }
  return count
}

function nextGeneration(grid: Grid): Grid {
  const newGrid = createEmptyGrid()
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      const neighbors = countNeighbors(grid, x, y)
      if (grid[x][y]) {
        newGrid[x][y] = neighbors === 2 || neighbors === 3
      } else {
        newGrid[x][y] = neighbors === 3
      }
    }
  }
  return newGrid
}

function placePattern(grid: Grid, pattern: boolean[][], startX: number, startY: number): Grid {
  const newGrid = [...grid]
  for (let x = 0; x < pattern.length; x++) {
    for (let y = 0; y < pattern[x].length; y++) {
      const gridX = startX + x
      const gridY = startY + y
      if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE) {
        newGrid[gridX][gridY] = pattern[x][y]
      }
    }
  }
  return newGrid
}

function App() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid())
  const [running, setRunning] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null)

  const toggleCell = (x: number, y: number) => {
    const newGrid = [...grid]
    newGrid[x][y] = !newGrid[x][y]
    setGrid(newGrid)
  }

  const runSimulation = useCallback(() => {
    if (!running) return
    setGrid(nextGeneration)
  }, [running])

  const handlePatternSelect = (pattern: Pattern) => {
    setSelectedPattern(pattern)
    // Center the pattern in the grid
    const patternGrid = getPatternGrid(pattern)
    const startX = Math.floor((GRID_SIZE - patternGrid.length) / 2)
    const startY = Math.floor((GRID_SIZE - patternGrid[0].length) / 2)
    setGrid(placePattern(createEmptyGrid(), patternGrid, startX, startY))
  }

  useEffect(() => {
    const interval = setInterval(runSimulation, SPEED)
    return () => clearInterval(interval)
  }, [runSimulation])

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => {
                  setGrid(createEmptyGrid());
                  setSelectedPattern(null);
                }}>Clear</button>
        <select
          value={selectedPattern?.name || ''}
          onChange={(e) => {
            const pattern = patterns.find(p => p.name === e.target.value)
            if (pattern) handlePatternSelect(pattern)
          }}
        >
          <option value="">Select a pattern</option>
          {patterns.map((pattern) => (
            <option key={pattern.name} value={pattern.name}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>
      {selectedPattern && (
        <div className="pattern-description">
          {selectedPattern.description}
        </div>
      )}
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        }}
      >
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`cell ${cell ? 'alive' : ''}`}
              onClick={() => toggleCell(x, y)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App 
