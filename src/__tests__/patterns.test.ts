import { describe, it, expect } from '@jest/globals';
import { patterns, getPatternGrid, Pattern } from '../patterns';

describe('Pattern Functions', () => {
  describe('patterns', () => {
    it('should have the expected patterns defined', () => {
      expect(patterns.length).toBeGreaterThan(0);

      // Check for specific patterns
      const patternNames = patterns.map(p => p.name);
      expect(patternNames).toContain('Glider');
      expect(patternNames).toContain('Blinker');
      expect(patternNames).toContain('Beacon');
      expect(patternNames).toContain('Gosper Glider Gun');
      expect(patternNames).toContain('Pulsar');
      expect(patternNames).toContain('Spaceship');
    });

    it('should have valid pattern structures', () => {
      patterns.forEach(pattern => {
        expect(pattern).toHaveProperty('name');
        expect(pattern).toHaveProperty('pattern');
        expect(pattern).toHaveProperty('description');
        expect(Array.isArray(pattern.pattern)).toBe(true);
        expect(pattern.pattern.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getPatternGrid', () => {
    it('should convert string patterns to boolean grids correctly', () => {
      const glider: Pattern = {
        name: "Glider",
        pattern: [
          ".O.",
          "..O",
          "OOO"
        ],
        description: "A simple spaceship that moves diagonally",
      };

      const grid = getPatternGrid(glider);

      // Check dimensions
      expect(grid.length).toBe(3);
      expect(grid[0].length).toBe(3);

      // Check specific cells for the glider pattern
      // First row: .O.
      expect(grid[0][0]).toBe(false);
      expect(grid[0][1]).toBe(true);
      expect(grid[0][2]).toBe(false);

      // Second row: ..O
      expect(grid[1][0]).toBe(false);
      expect(grid[1][1]).toBe(false);
      expect(grid[1][2]).toBe(true);

      // Third row: OOO
      expect(grid[2][0]).toBe(true);
      expect(grid[2][1]).toBe(true);
      expect(grid[2][2]).toBe(true);
    });

    it('should correctly convert the Spaceship pattern', () => {
      // Find the Spaceship pattern
      const spaceship = patterns.find(p => p.name === 'Spaceship');
      expect(spaceship).toBeDefined();

      if (spaceship) {
        const grid = getPatternGrid(spaceship);

        // Check dimensions for a lightweight spaceship (LWSS)
        expect(grid.length).toBe(4);
        expect(grid[0].length).toBe(5);

        // Check specific cells for the LWSS pattern
        // First row: .OO..
        expect(grid[0][0]).toBe(false);
        expect(grid[0][1]).toBe(true);
        expect(grid[0][2]).toBe(true);
        expect(grid[0][3]).toBe(false);
        expect(grid[0][4]).toBe(false);

        // Second row: O...O
        expect(grid[1][0]).toBe(true);
        expect(grid[1][1]).toBe(false);
        expect(grid[1][2]).toBe(false);
        expect(grid[1][3]).toBe(false);
        expect(grid[1][4]).toBe(true);

        // Third row: O....
        expect(grid[2][0]).toBe(true);
        expect(grid[2][1]).toBe(false);
        expect(grid[2][2]).toBe(false);
        expect(grid[2][3]).toBe(false);
        expect(grid[2][4]).toBe(false);

        // Fourth row: O...O
        expect(grid[3][0]).toBe(true);
        expect(grid[3][1]).toBe(false);
        expect(grid[3][2]).toBe(false);
        expect(grid[3][3]).toBe(false);
        expect(grid[3][4]).toBe(true);
      }
    });

    it('should handle patterns of different sizes', () => {
      // Test with a blinker (1x3)
      const blinker = patterns.find(p => p.name === 'Blinker');
      expect(blinker).toBeDefined();

      if (blinker) {
        const grid = getPatternGrid(blinker);
        expect(grid.length).toBe(1);
        expect(grid[0].length).toBe(3);
        expect(grid[0][0]).toBe(true);
        expect(grid[0][1]).toBe(true);
        expect(grid[0][2]).toBe(true);
      }

      // Test with a beacon (4x4)
      const beacon = patterns.find(p => p.name === 'Beacon');
      expect(beacon).toBeDefined();

      if (beacon) {
        const grid = getPatternGrid(beacon);
        expect(grid.length).toBe(4);
        expect(grid[0].length).toBe(4);
      }
    });
  });
});
