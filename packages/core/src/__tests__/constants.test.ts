import { describe, it, expect } from 'vitest';
import {
  defaultVariables,
  defaultFormulas,
  exampleFormulas1,
  darkTheme,
  lightTheme,
  mapFormulaStringArray,
  sortById,
  kBlackList,
  symbolSubs,
} from '../constants.js';

describe('Constants', () => {
  describe('defaultVariables', () => {
    it('creates 8 variables A through H', () => {
      expect(defaultVariables).toHaveLength(8);
      expect(defaultVariables[0].name).toBe('A');
      expect(defaultVariables[7].name).toBe('H');
    });

    it('has consistent structure', () => {
      defaultVariables.forEach((variable, index) => {
        expect(variable.id).toBe(index);
        expect(variable.value).toBe(0.0);
        expect(variable.step).toBe(0.01);
        expect(variable.min).toBe(-1);
        expect(variable.max).toBe(1);
      });
    });
  });

  describe('defaultFormulas', () => {
    it('creates 6 formulas with first one containing x*A', () => {
      expect(defaultFormulas).toHaveLength(6);
      expect(defaultFormulas[0].value).toBe('x*A');
      expect(defaultFormulas[0].enabled).toBe(true);
    });

    it('has proper ID sequence', () => {
      defaultFormulas.forEach((formula, index) => {
        expect(formula.id).toBe(index);
      });
    });
  });

  describe('exampleFormulas1', () => {
    it('creates complex example formulas', () => {
      expect(exampleFormulas1).toHaveLength(6);
      expect(exampleFormulas1[0].value).toContain('smoothstep');
      expect(exampleFormulas1[1].value).toContain('sqrt');
    });
  });

  describe('themes', () => {
    it('darkTheme has expected structure', () => {
      expect(darkTheme.mBackground).toBe('#202020');
      expect(darkTheme.mGraphs).toHaveLength(6);
      expect(Array.isArray(darkTheme.mGraphs)).toBe(true);
    });

    it('lightTheme has expected structure', () => {
      expect(lightTheme.mBackground).toBe('#FFFFFF');
      expect(lightTheme.mGraphs).toHaveLength(6);
      expect(Array.isArray(lightTheme.mGraphs)).toBe(true);
    });

    it('both themes have all required properties', () => {
      const requiredProps = [
        'mBackground',
        'mBackgroundOut',
        'mText',
        'mGrid',
        'mGridThin',
        'mGraphs',
      ];

      requiredProps.forEach(prop => {
        expect(darkTheme).toHaveProperty(prop);
        expect(lightTheme).toHaveProperty(prop);
      });
    });
  });

  describe('mapFormulaStringArray', () => {
    it('creates formula object from string and id', () => {
      const formula = mapFormulaStringArray('sin(x)', 2);
      
      expect(formula.value).toBe('sin(x)');
      expect(formula.id).toBe(2);
      expect(formula.enabled).toBe(true);
      expect(formula.visualizer).toEqual([false, false, false]);
    });

    it('sets visualizer to [true, true, true] for id 0', () => {
      const formula = mapFormulaStringArray('x', 0);
      expect(formula.visualizer).toEqual([true, true, true]);
    });
  });

  describe('kBlackList', () => {
    it('contains security-related strings', () => {
      expect(kBlackList).toContain('alert');
      expect(kBlackList).toContain('new');
      expect(kBlackList).toContain('doc');
      expect(Array.isArray(kBlackList)).toBe(true);
    });
  });

  describe('symbolSubs', () => {
    it('contains symbol substitutions', () => {
      expect(symbolSubs).toContainEqual(['^', '**']);
      expect(symbolSubs).toContainEqual(['²', '**2']);
      expect(symbolSubs).toContainEqual(['π', 'PI']);
      expect(symbolSubs).toContainEqual(['½', '(1/2)']);
    });

    it('all substitutions are tuples', () => {
      symbolSubs.forEach(sub => {
        expect(sub).toHaveLength(2);
        expect(typeof sub[0]).toBe('string');
        expect(typeof sub[1]).toBe('string');
      });
    });
  });
});