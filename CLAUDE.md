# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

This is a pnpm workspace monorepo with two packages:
- `packages/core` - The @graphtoy/core library
- `packages/example` - Nuxt.js example application

## Commands

**Monorepo Commands (run from root):**
- `pnpm build` - Build all packages
- `pnpm dev` - Start all packages in development mode
- `pnpm test` - Run tests across all packages
- `pnpm type-check` - TypeScript checking across all packages
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean build artifacts from all packages

**Core Library (packages/core):**
- `pnpm --filter @graphtoy/core build` - Build only the core library
- `pnpm --filter @graphtoy/core test` - Test only the core library
- `pnpm --filter @graphtoy/core dev` - Build core library in watch mode

**Example App:**
- `pnpm example` - Start the Nuxt example app on http://localhost:3000
- `pnpm --filter @graphtoy/example dev` - Alternative way to start example app

## Architecture

This is a TypeScript library for mathematical graphing with real-time visualization. The core architecture centers around:

**Main Classes:**
- `Grapher` - Primary class that handles canvas rendering, formula compilation, animation, and user interaction
- `EventEmitter` - Built-in event system (no external dependencies) for communication between components

**Key Components:**
- **Formula System**: Compiles string expressions into JavaScript functions using `new Function()`, supporting variables (A-Z), built-in math functions, and function references (f1, f2, etc.)
- **Canvas Rendering**: Direct 2D canvas manipulation with themes, grid system, and interactive pan/zoom
- **Mathematical Functions**: 50+ functions including GLSL-style functions (mix, smoothstep, clamp), easing functions from easings.net, and noise functions
- **Event-Driven**: Uses custom EventEmitter for time updates, coordinate tracking, formula compilation events, and error handling

**Architecture Patterns:**
- The Grapher class maintains state for formulas, variables, themes, and canvas interaction
- Formula compilation happens dynamically with error handling and event emission
- Animation loop uses requestAnimationFrame with time management and pause/play functionality
- Canvas rendering uses immediate mode with coordinate transformations and pixel-level drawing

**Module Structure:**
- All exports are ESM with full TypeScript support
- Math functions are pure and can be used standalone
- Constants file contains themes, default data, and symbol substitutions
- Zero runtime dependencies (built-in event system replaces mitt/eventemitter3)

The library is designed to be embedded in other applications as a complete graphing solution with real-time mathematical visualization capabilities.