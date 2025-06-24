import { describe, it, expect } from 'vitest';
import {
  clamp,
  saturate,
  remap,
  smoothstep,
  ssign,
  radians,
  degrees,
  inversesqrt,
  rsqrt,
  rcbrt,
  rcp,
  fma,
  step,
  mix,
  lerp,
  over,
  tri,
  sqr,
  frac,
  fract,
  exp2,
  exp10,
  mod,
  cellnoise,
  voronoi,
  noise,
  easeInQuad,
  easeOutQuad,
  easeInCubic,
  linear,
} from '../math-functions.js';

describe('Math Functions', () => {
  describe('clamp', () => {
    it('clamps values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('saturate', () => {
    it('clamps values to [0, 1]', () => {
      expect(saturate(0.5)).toBe(0.5);
      expect(saturate(-0.5)).toBe(0);
      expect(saturate(1.5)).toBe(1);
    });
  });

  describe('remap', () => {
    it('remaps values from one range to another', () => {
      expect(remap(0, 10, 5, 0, 100)).toBe(50);
      expect(remap(0, 10, 0, 0, 100)).toBe(0);
      expect(remap(0, 10, 10, 0, 100)).toBe(100);
    });

    it('handles values outside input range', () => {
      expect(remap(0, 10, -5, 0, 100)).toBe(0);
      expect(remap(0, 10, 15, 0, 100)).toBe(100);
    });
  });

  describe('smoothstep', () => {
    it('performs smooth interpolation', () => {
      expect(smoothstep(0, 1, 0)).toBe(0);
      expect(smoothstep(0, 1, 1)).toBe(1);
      expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5, 1);
    });
  });

  describe('ssign', () => {
    it('returns sign with positive zero handling', () => {
      expect(ssign(5)).toBe(1);
      expect(ssign(-5)).toBe(-1);
      expect(ssign(0)).toBe(1);
    });
  });

  describe('radians/degrees conversion', () => {
    it('converts degrees to radians', () => {
      expect(radians(180)).toBeCloseTo(Math.PI, 5);
      expect(radians(90)).toBeCloseTo(Math.PI / 2, 5);
    });

    it('converts radians to degrees', () => {
      expect(degrees(Math.PI)).toBeCloseTo(180, 5);
      expect(degrees(Math.PI / 2)).toBeCloseTo(90, 5);
    });
  });

  describe('inverse functions', () => {
    it('inversesqrt calculates 1/sqrt(x)', () => {
      expect(inversesqrt(4)).toBeCloseTo(0.5, 5);
      expect(inversesqrt(1)).toBe(1);
    });

    it('rsqrt is alias for inversesqrt', () => {
      expect(rsqrt(4)).toBe(inversesqrt(4));
    });

    it('rcbrt calculates 1/cbrt(x)', () => {
      expect(rcbrt(8)).toBeCloseTo(0.5, 5);
      expect(rcbrt(1)).toBe(1);
    });

    it('rcp calculates 1/x', () => {
      expect(rcp(2)).toBe(0.5);
      expect(rcp(0.5)).toBe(2);
    });
  });

  describe('fma (fused multiply-add)', () => {
    it('calculates x*y+z', () => {
      expect(fma(2, 3, 4)).toBe(10);
      expect(fma(0.1, 0.2, 0.3)).toBeCloseTo(0.32, 10);
    });
  });

  describe('step function', () => {
    it('returns 0 or 1 based on threshold', () => {
      expect(step(5, 3)).toBe(0);
      expect(step(5, 7)).toBe(1);
      expect(step(5, 5)).toBe(1);
    });
  });

  describe('mix/lerp', () => {
    it('linearly interpolates between values', () => {
      expect(mix(0, 10, 0.5)).toBe(5);
      expect(mix(0, 10, 0)).toBe(0);
      expect(mix(0, 10, 1)).toBe(10);
    });

    it('lerp is alias for mix', () => {
      expect(lerp(0, 10, 0.5)).toBe(mix(0, 10, 0.5));
    });
  });

  describe('over function', () => {
    it('performs alpha compositing operation', () => {
      expect(over(0.5, 0.5)).toBe(0.75);
      expect(over(0, 0)).toBe(0);
      expect(over(1, 1)).toBe(1);
    });
  });

  describe('frac/fract', () => {
    it('returns fractional part', () => {
      expect(frac(3.14)).toBeCloseTo(0.14, 2);
      expect(frac(-2.7)).toBeCloseTo(0.3, 1);
      expect(frac(5)).toBe(0);
    });

    it('fract is alias for frac', () => {
      expect(fract(3.14)).toBe(frac(3.14));
    });
  });

  describe('exponential functions', () => {
    it('exp2 calculates 2^x', () => {
      expect(exp2(3)).toBe(8);
      expect(exp2(0)).toBe(1);
    });

    it('exp10 calculates 10^x', () => {
      expect(exp10(2)).toBe(100);
      expect(exp10(0)).toBe(1);
    });
  });

  describe('mod function', () => {
    it('calculates modulo correctly', () => {
      expect(mod(7, 3)).toBeCloseTo(1, 5);
      expect(mod(-7, 3)).toBeCloseTo(2, 5);
      expect(mod(6, 3)).toBeCloseTo(0, 5);
    });
  });

  describe('noise functions', () => {
    it('cellnoise returns consistent values', () => {
      const val1 = cellnoise(5);
      const val2 = cellnoise(5);
      expect(val1).toBe(val2);
      expect(val1).toBeGreaterThanOrEqual(0);
      expect(val1).toBeLessThanOrEqual(1);
    });

    it('noise returns values in expected range', () => {
      const val = noise(5);
      expect(val).toBeGreaterThanOrEqual(-2);
      expect(val).toBeLessThanOrEqual(2);
    });

    it('voronoi returns non-negative values', () => {
      const val = voronoi(5);
      expect(val).toBeGreaterThanOrEqual(0);
    });
  });

  describe('easing functions', () => {
    it('linear returns input unchanged', () => {
      expect(linear(0.5)).toBe(0.5);
      expect(linear(0)).toBe(0);
      expect(linear(1)).toBe(1);
    });

    it('easeInQuad follows quadratic curve', () => {
      expect(easeInQuad(0)).toBe(0);
      expect(easeInQuad(1)).toBe(1);
      expect(easeInQuad(0.5)).toBe(0.25);
    });

    it('easeOutQuad is inverse of easeInQuad', () => {
      expect(easeOutQuad(0)).toBe(0);
      expect(easeOutQuad(1)).toBe(1);
      expect(easeOutQuad(0.5)).toBe(0.75);
    });

    it('easeInCubic follows cubic curve', () => {
      expect(easeInCubic(0)).toBe(0);
      expect(easeInCubic(1)).toBe(1);
      expect(easeInCubic(0.5)).toBe(0.125);
    });
  });

  describe('tri function', () => {
    it('generates triangular wave', () => {
      const val = tri(0.5, 0);
      expect(val).toBeGreaterThanOrEqual(-1);
      expect(val).toBeLessThanOrEqual(1);
    });
  });

  describe('sqr function', () => {
    it('generates square wave', () => {
      const val = sqr(0, Math.PI / 2);
      expect([1, -1]).toContain(val);
    });
  });
});