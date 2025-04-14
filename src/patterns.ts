export type Pattern = {
  name: string;
  pattern: string[];
  description: string;
};

function convertPattern(pattern: string[]): boolean[][] {
  return pattern.map(row => 
    row.split('').map(cell => cell === 'O')
  );
}

export const patterns: Pattern[] = [
  {
    name: "Glider",
    pattern: [
      ".O.",
      "..O",
      "OOO"
    ],
    description: "A simple spaceship that moves diagonally",
  },
  {
    name: "Blinker",
    pattern: [
      "OOO"
    ],
    description: "Oscillates between horizontal and vertical lines",
  },
  {
    name: "Beacon",
    pattern: [
      "OO..",
      "OO..",
      "..OO",
      "..OO"
    ],
    description: "A simple oscillator that blinks every 2 generations",
  },
  {
    name: "Gosper Glider Gun",
    pattern: [
      "........................O...........",
      "......................O.O...........",
      "............OO......OO............OO",
      "...........O...O....OO............OO",
      "OO........O.....O...OO..............",
      "OO........O...O.OO....O.O...........",
      "..........O.....O.......O...........",
      "...........O...O....................",
      "............OO......................"
    ],
    description: "A pattern that continuously creates gliders",
  },
  {
    name: "Pulsar",
    pattern: [
      "..OOO...OOO..",
      ".............",
      "O....O.O....O",
      "O....O.O....O",
      "O....O.O....O",
      "..OOO...OOO..",
      ".............",
      "..OOO...OOO..",
      "O....O.O....O",
      "O....O.O....O",
      "O....O.O....O",
      ".............",
      "..OOO...OOO.."
    ],
    description: "A period-3 oscillator",
  },
  {
    name: "Spaceship",
    pattern: [
      ".OO..",
      "O...O",
      "O....",
      "O...O"
    ],
    description: "A lightweight spaceship (LWSS) that moves horizontally",
  },
];

export function getPatternGrid(pattern: Pattern): boolean[][] {
  return convertPattern(pattern.pattern);
} 
