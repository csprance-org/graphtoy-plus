import { describe, it, expect } from 'vitest';
import { getErrorMessage, isBadNum, sortById } from '../utils.js';

describe('Utils', () => {
  describe('getErrorMessage', () => {
    it('extracts message from Error objects', () => {
      const error = new Error('Test error');
      expect(getErrorMessage(error)).toBe('Test error');
    });

    it('converts non-Error values to string', () => {
      expect(getErrorMessage('string error')).toBe('string error');
      expect(getErrorMessage(123)).toBe('123');
      expect(getErrorMessage(null)).toBe('null');
      expect(getErrorMessage(undefined)).toBe('undefined');
    });
  });

  describe('isBadNum', () => {
    it('identifies NaN as bad', () => {
      expect(isBadNum(NaN)).toBe(true);
    });

    it('identifies Infinity as bad', () => {
      expect(isBadNum(Infinity)).toBe(true);
      expect(isBadNum(-Infinity)).toBe(true);
    });

    it('identifies finite numbers as good', () => {
      expect(isBadNum(0)).toBe(false);
      expect(isBadNum(42)).toBe(false);
      expect(isBadNum(-42)).toBe(false);
      expect(isBadNum(3.14)).toBe(false);
    });
  });

  describe('sortById', () => {
    it('sorts objects by id property', () => {
      const items = [
        { id: 3, name: 'third' },
        { id: 1, name: 'first' },
        { id: 2, name: 'second' },
      ];

      items.sort(sortById);

      expect(items[0].id).toBe(1);
      expect(items[1].id).toBe(2);
      expect(items[2].id).toBe(3);
    });

    it('handles negative ids', () => {
      const items = [
        { id: -1, name: 'negative' },
        { id: 0, name: 'zero' },
        { id: 1, name: 'positive' },
      ];

      items.sort(sortById);

      expect(items[0].id).toBe(-1);
      expect(items[1].id).toBe(0);
      expect(items[2].id).toBe(1);
    });
  });
});