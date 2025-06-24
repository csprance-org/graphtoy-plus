import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Grapher } from '../grapher.js';

// Mock HTMLCanvasElement and CanvasRenderingContext2D
class MockCanvasRenderingContext2D {
  fillStyle = '';
  strokeStyle = '';
  lineWidth = 1;
  font = '';

  fillRect = vi.fn();
  strokeRect = vi.fn();
  beginPath = vi.fn();
  moveTo = vi.fn();
  lineTo = vi.fn();
  stroke = vi.fn();
  fill = vi.fn();
  setTransform = vi.fn();
  fillText = vi.fn();
  createLinearGradient = vi.fn(() => ({
    addColorStop: vi.fn()
  }));
}

class MockHTMLCanvasElement {
  width = 800;
  height = 600;
  offsetWidth = 800;
  offsetHeight = 600;
  
  onmousedown: ((e: MouseEvent) => void) | null = null;
  onmousemove: ((e: MouseEvent) => void) | null = null;
  onmouseup: ((e: MouseEvent) => void) | null = null;
  onmouseout: ((e: MouseEvent) => void) | null = null;

  addEventListener = vi.fn();
  removeEventListener = vi.fn();

  getContext() {
    return new MockCanvasRenderingContext2D();
  }
}

// Mock window and devicePixelRatio
Object.defineProperty(window, 'devicePixelRatio', {
  writable: true,
  value: 1,
});

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: vi.fn((callback) => setTimeout(callback, 16)),
});

Object.defineProperty(window, 'onresize', {
  writable: true,
  value: null,
});

describe('Grapher', () => {
  let grapher: Grapher;
  let canvas: MockHTMLCanvasElement;

  beforeEach(() => {
    grapher = new Grapher();
    canvas = new MockHTMLCanvasElement();
  });

  it('creates instance with event emitter', () => {
    expect(grapher).toBeDefined();
    expect(grapher.events).toBeDefined();
    expect(typeof grapher.events.on).toBe('function');
    expect(typeof grapher.events.off).toBe('function');
    expect(typeof grapher.events.emit).toBe('function');
  });

  it('can set canvas', () => {
    grapher.setCanvas(canvas as unknown as HTMLCanvasElement);
    expect(grapher.mCanvas).toBe(canvas);
    expect(grapher.mContext).toBeDefined();
  });

  it('has default properties', () => {
    expect(grapher.mPaused).toBe(true);
    expect(grapher.mTheme).toBe(0); // Dark theme
    expect(grapher.mShowAxes).toBe(1);
    expect(grapher.mRangeType).toBe(2);
    expect(grapher.mFormulas).toHaveLength(6);
    expect(grapher.mVariables).toHaveLength(8);
  });

  it('can toggle play/pause', () => {
    const playPauseListener = vi.fn();
    grapher.events.on('playPause', playPauseListener);

    const initialPaused = grapher.mPaused;
    grapher.togglePlay();

    expect(grapher.mPaused).toBe(!initialPaused);
    expect(playPauseListener).toHaveBeenCalledWith(!initialPaused);
  });

  it('can reset time', () => {
    const timeListener = vi.fn();
    grapher.events.on('time', timeListener);

    grapher.resetTime(5.0);

    expect(grapher.mTimeS).toBe(5.0);
    expect(grapher.mTimeMS).toBe(5.0);
    expect(timeListener).toHaveBeenCalledWith(5.0);
  });

  it('can toggle theme', () => {
    const initialTheme = grapher.mTheme;
    grapher.toggleTheme();
    expect(grapher.mTheme).toBe(1 - initialTheme);

    grapher.toggleTheme();
    expect(grapher.mTheme).toBe(initialTheme);
  });

  it('can toggle show axes', () => {
    const initialAxes = grapher.mShowAxes;
    grapher.toggleShowAxes();
    expect(grapher.mShowAxes).toBe((initialAxes + 1) % 3);
  });

  it('can toggle range type', () => {
    const initialRange = grapher.mRangeType;
    grapher.toggleRange();
    expect(grapher.mRangeType).toBe((initialRange + 1) % 3);
  });

  it('can toggle visualizer', () => {
    const initialVisualizer = grapher.mShowVisualizer;
    grapher.toggleVisualizer();
    expect(grapher.mShowVisualizer).toBe(!initialVisualizer);
  });

  it('can set formulas', () => {
    const newFormulas = [{
      id: 0,
      value: 'sin(x)',
      enabled: true,
      visualizer: [false, false, false] as [boolean, boolean, boolean]
    }];

    grapher.setFormulas(newFormulas);
    expect(grapher.mFormulas).toBe(newFormulas);
  });

  it('can set variables', () => {
    const newVariables = [{
      id: 0,
      name: 'X',
      value: 1.0,
      min: -10,
      max: 10,
      step: 0.1
    }];

    grapher.setVariables(newVariables);
    expect(grapher.mVariables).toBe(newVariables);
  });

  it('emits formula error for invalid formulas', () => {
    const errorListener = vi.fn();
    grapher.events.on('formulaError', errorListener);

    const badFormula = {
      id: 0,
      value: 'invalid function syntax!!!',
      enabled: true,
      visualizer: [false, false, false] as [boolean, boolean, boolean]
    };

    const result = grapher.compileFormula(badFormula);
    expect(result).toBe(false);
    expect(errorListener).toHaveBeenCalled();
  });

  it('can compile valid formulas', () => {
    const compiledListener = vi.fn();
    grapher.events.on('formulaCompiled', compiledListener);

    const goodFormula = {
      id: 0,
      value: 'sin(x)',
      enabled: true,
      visualizer: [false, false, false] as [boolean, boolean, boolean]
    };

    const result = grapher.compileFormula(goodFormula);
    expect(result).toBe(true);
    expect(compiledListener).toHaveBeenCalledWith(0);
  });

  it('can reset coordinates', () => {
    grapher.mCx = 10;
    grapher.mCy = 10;
    grapher.mRa = 5;

    grapher.resetCoords();

    expect(grapher.mCx).toBe(0);
    expect(grapher.mCy).toBe(0);
    expect(grapher.mRa).toBe(12);
  });
});