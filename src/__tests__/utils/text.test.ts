import {
  getLimitedText,
  capitalizeFirstLetter,
  getLimitedWords,
  pluralize,
} from '@/utils/text';

describe('Text Utilities', () => {
  describe('getLimitedText', () => {
    it('should return original text when under limit', () => {
      const text = 'Hello';
      const limit = 10;

      const result = getLimitedText(text, limit);

      expect(result).toBe('Hello');
    });

    it('should truncate text and add ellipsis when over limit', () => {
      const text = 'This is a very long text';
      const limit = 10;

      const result = getLimitedText(text, limit);

      expect(result).toBe('This is a ...');
    });

    it('should handle edge case of exact limit', () => {
      const text = 'Exactly10';
      const limit = 9;

      const result = getLimitedText(text, limit);

      expect(result).toBe('Exactly10');
    });

    it('should handle empty string', () => {
      const result = getLimitedText('', 5);
      expect(result).toBe('');
    });

    it('should handle zero limit', () => {
      const result = getLimitedText('Hello', 0);
      expect(result).toBe('...');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter of lowercase word', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    it('should keep already capitalized word unchanged', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(capitalizeFirstLetter('hELLO')).toBe('HELLO');
    });
  });

  describe('getLimitedWords', () => {
    it('should return all words when under limit', () => {
      const text = 'one two three';
      const result = getLimitedWords(text, 5);
      expect(result).toEqual(['one', 'two', 'three']);
    });

    it('should limit words and add ellipsis to last word', () => {
      const text = 'one two three four five';
      const result = getLimitedWords(text, 3);
      expect(result).toEqual(['one', 'two', 'three...']);
    });

    it('should handle single word', () => {
      const text = 'hello';
      const result = getLimitedWords(text, 3);
      expect(result).toEqual(['hello']);
    });

    it('should handle empty string', () => {
      const result = getLimitedWords('', 3);
      expect(result).toEqual(['']);
    });
  });

  describe('pluralize', () => {
    it('should return singular form for count of 1', () => {
      expect(pluralize('cat', 1)).toBe('cat');
    });

    it('should return plural form for count greater than 1', () => {
      expect(pluralize('cat', 2)).toBe('cats');
      expect(pluralize('dog', 5)).toBe('dogs');
    });

    it('should return singular form for count of 0', () => {
      expect(pluralize('item', 0)).toBe('item');
    });

    it('should handle negative numbers', () => {
      expect(pluralize('error', -1)).toBe('error');
    });
  });
});
