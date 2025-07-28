import { getSign } from '@/utils/number';

describe('Number Utilities', () => {
  describe('getSign', () => {
    it('should return "+" for positive numbers', () => {
      expect(getSign(5)).toBe('+');
      expect(getSign(100)).toBe('+');
      expect(getSign(0.1)).toBe('+');
    });

    it('should return "-" for negative numbers', () => {
      expect(getSign(-5)).toBe('-');
      expect(getSign(-100)).toBe('-');
      expect(getSign(-0.1)).toBe('-');
    });

    it('should return "+" for zero', () => {
      expect(getSign(0)).toBe('+');
    });

    it('should return "+" for positive zero', () => {
      expect(getSign(+0)).toBe('+');
    });

    it('should return "+" for negative zero', () => {
      expect(getSign(-0)).toBe('+');
    });
  });
});
