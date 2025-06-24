# @graphtoy/core

A modern TypeScript library for mathematical graphing with real-time visualization capabilities. Originally extracted from GraphToy, this library provides powerful tools for rendering mathematical functions on HTML5 Canvas with interactive features.

## Features

- **Real-time Mathematical Graphing**: Plot mathematical functions with live updates
- **Interactive Canvas**: Pan, zoom, and explore graphs with mouse and touch support
- **Rich Math Functions**: Comprehensive collection of mathematical functions including:
  - Basic operations and trigonometry
  - Easing functions from easings.net
  - Noise functions (Perlin, cellular, Voronoi)
  - GLSL-style functions (mix, smoothstep, clamp, etc.)
- **Modern TypeScript**: Full type safety with ESM support
- **Zero Dependencies**: Completely self-contained with built-in event system
- **Theme Support**: Built-in dark and light themes
- **Symbol Support**: Unicode mathematical symbols (π, ², ³, fractions, etc.)

## Installation

```bash
pnpm add @graphtoy/core
# or
npm install @graphtoy/core
```

## Quick Start

```typescript
import { Grapher } from '@graphtoy/core';

// Create grapher instance
const grapher = new Grapher();

// Set up canvas
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
grapher.setCanvas(canvas);

// Start graphing
grapher.start();

// Listen for events - self-contained, no external dependencies!
grapher.events.on('time', (t) => console.log('Time:', t));
grapher.events.on('formulaError', ({ error, formula }) => {
  console.error('Formula error:', error, formula);
});
```

## API Reference

### Core Classes

#### `Grapher`

Main graphing engine that handles rendering and interaction.

```typescript
const grapher = new Grapher();
```

**Methods:**
- `setCanvas(canvas: HTMLCanvasElement)` - Set the canvas element
- `start()` - Initialize and start the grapher
- `togglePlay()` - Play/pause animation
- `resetTime(t?: number)` - Reset time to specified value
- `setFormulas(formulas: Formula[])` - Update formulas
- `setVariables(variables: Variable[])` - Update variables
- `toggleTheme()` - Switch between dark/light theme
- `draw()` - Force redraw

### Mathematical Functions

Over 50 mathematical functions are available:

```typescript
import { 
  clamp, saturate, smoothstep, mix, lerp,
  noise, cellnoise, voronoi,
  easeInQuad, easeOutBounce,
  radians, degrees
} from '@graphtoy/core';

// Use in formulas or directly
const result = smoothstep(0, 1, 0.5); // 0.5
```

### Types

```typescript
interface Formula {
  value: string;      // Mathematical expression
  enabled: boolean;   // Whether to render
  id: number;        // Unique identifier
  visualizer: [boolean, boolean, boolean]; // RGB channels
}

interface Variable {
  name: string;   // Variable name (A, B, C, etc.)
  value: number;  // Current value
  min: number;    // Minimum value
  max: number;    // Maximum value
  step: number;   // Increment step
  id: number;     // Unique identifier
}
```

## Formula Syntax

Formulas support standard mathematical expressions with variables and functions:

```javascript
// Basic math
"sin(x) + cos(t)"

// With variables
"A * sin(x + B) + C"

// Function references
"f1(x, t) + f2(x, t)"

// Complex expressions
"mix(sin(x), cos(x), smoothstep(0, 1, abs(x)))"

// Unicode symbols
"π * x² + ½"
```

## Events

The grapher has a built-in event system accessible via `grapher.events`:

```typescript
grapher.events.on('time', (time: number) => {
  // Time updated (during animation)
});

grapher.events.on('coords', ([x, y]: [number, number]) => {
  // Mouse coordinates in graph space
});

grapher.events.on('formulaError', ({ error, formula }) => {
  // Formula compilation or evaluation error
});

grapher.events.on('formulaCompiled', (id: number) => {
  // Formula successfully compiled
});

grapher.events.on('playPause', (paused: boolean) => {
  // Play/pause state changed
});

// Remove listeners
grapher.events.off('time', timeHandler);

// Remove all listeners for an event
grapher.events.removeAllListeners('time');

// Remove all listeners
grapher.events.removeAllListeners();
```

## Themes

Built-in themes can be accessed and customized:

```typescript
import { darkTheme, lightTheme } from '@graphtoy/core';

// Use built-in themes
grapher.mTheme = 0; // Dark theme
grapher.mTheme = 1; // Light theme

// Or create custom themes
const customTheme: GrapherTheme = {
  mBackground: '#1a1a1a',
  mBackgroundOut: '#000000',
  mText: '#ffffff',
  mGrid: '#444444',
  mGridThin: '#222222',
  mGraphs: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
};
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Type checking
pnpm type-check
```

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Credits

Originally based on GraphToy by Íñigo Quílez. Easing functions from https://easings.net/.