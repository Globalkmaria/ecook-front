import {
  getArrayAndMessage,
  getArrayAndWithBeVerbMessage,
  getArrayOrMessage,
} from '@/utils/message';

describe('Message Utilities', () => {
  describe('getArrayOrMessage', () => {
    it('should return the correct message', () => {
      expect(getArrayOrMessage(['apple', 'banana', 'cherry'])).toBe(
        'apple, banana or cherry',
      );
    });

    it('should return the correct message for two items', () => {
      expect(getArrayOrMessage(['apple', 'banana'])).toBe('apple or banana');
    });

    it('should return the correct message for one item', () => {
      expect(getArrayOrMessage(['apple'])).toBe('apple');
    });

    it('should return the correct message for no items', () => {
      expect(getArrayOrMessage([])).toBe('');
    });
  });

  describe('getArrayAndMessage', () => {
    it('should return the correct message', () => {
      expect(getArrayAndMessage(['apple', 'banana', 'cherry'])).toBe(
        'apple, banana and cherry',
      );
    });

    it('should return the correct message for two items', () => {
      expect(getArrayAndMessage(['apple', 'banana'])).toBe('apple and banana');
    });

    it('should return the correct message for one item', () => {
      expect(getArrayAndMessage(['apple'])).toBe('apple');
    });

    it('should return the correct message for no items', () => {
      expect(getArrayAndMessage([])).toBe('');
    });
  });

  describe('getArrayAndWithBeVerbMessage', () => {
    it('should return the correct message', () => {
      expect(getArrayAndWithBeVerbMessage(['apple', 'banana', 'cherry'])).toBe(
        'apple, banana and cherry are',
      );
    });

    it('should return the correct message for two items', () => {
      expect(getArrayAndWithBeVerbMessage(['apple', 'banana'])).toBe(
        'apple and banana are',
      );
    });

    it('should return the correct message for one item', () => {
      expect(getArrayAndWithBeVerbMessage(['apple'])).toBe('apple is');
    });

    it('should return the correct message for no items', () => {
      expect(getArrayAndWithBeVerbMessage([])).toBe('');
    });
  });
});
