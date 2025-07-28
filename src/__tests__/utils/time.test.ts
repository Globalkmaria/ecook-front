import dayjs from 'dayjs';

import {
  formatHours,
  formatMinutes,
  formatTime,
  formatTimeUnit,
  daysPassedSince,
  validateMinutes,
  dayLeftUntil,
  getToday,
  getDateAfterToday,
  formateDate,
} from '@/utils/time';

describe('Time Utilities', () => {
  describe('formatTimeUnit', () => {
    it('should return the correct time unit', () => {
      expect(formatTimeUnit(1, 'hr', 'hrs')).toBe('1 hr');
    });

    it('should return the correct time unit for multiple hours', () => {
      expect(formatTimeUnit(2, 'hr', 'hrs')).toBe('2 hrs');
    });

    it('should return the correct time unit for multiple minutes', () => {
      expect(formatTimeUnit(0, 'min', 'mins')).toBe('');
    });
  });

  describe('formatHours', () => {
    it('should return the correct time unit for multiple hours', () => {
      expect(formatHours(0)).toBe('');
    });

    it('should return the correct time unit for multiple hours', () => {
      expect(formatHours(1)).toBe('1 hr');
    });

    it('should return the correct time unit for multiple hours', () => {
      expect(formatHours(2)).toBe('2 hrs');
    });
  });

  describe('formatMinutes', () => {
    it('should return the correct time unit for multiple minutes', () => {
      expect(formatMinutes(0)).toBe('');
    });

    it('should return the correct time unit for multiple minutes', () => {
      expect(formatMinutes(1)).toBe('1 min');
    });

    it('should return the correct time unit for multiple minutes', () => {
      expect(formatMinutes(2)).toBe('2 mins');
    });
  });

  describe('formatTime', () => {
    it('should return the correct time unit for multiple hours', () => {
      expect(formatTime({ hours: 0, minutes: 0 })).toBe('');
    });

    it('should return the correct time unit for multiple hours', () => {
      expect(formatTime({ hours: 1, minutes: 1 })).toBe('1 hr 1 min');
    });

    it('should return the correct time unit for multiple hours', () => {
      expect(formatTime({ hours: 2, minutes: 2 })).toBe('2 hrs 2 mins');
    });
  });

  describe('validateMinutes', () => {
    it('should return the correct time unit for multiple minutes', () => {
      expect(validateMinutes('0')).toBe(true);
    });

    it('should return the correct time unit for multiple minutes', () => {
      expect(validateMinutes('1')).toBe(true);
    });

    it('should return the correct time unit for multiple minutes', () => {
      expect(validateMinutes('60')).toBe(false);
    });

    it('should return the correct time unit for multiple minutes', () => {
      expect(validateMinutes('61')).toBe(false);
    });

    it('should return false for invalid input', () => {
      expect(validateMinutes('string')).toBe(false);
    });

    it('should return false for negative input', () => {
      expect(validateMinutes('-1')).toBe(false);
    });
  });

  describe('daysPassedSince', () => {
    it('should return 0 for today', () => {
      const today = dayjs().format('YYYY-MM-DD');
      expect(daysPassedSince(today)).toBe(0);
    });

    it('should return 1 for yesterday', () => {
      const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      expect(daysPassedSince(yesterday)).toBe(1);
    });

    it('should return 0 for tomorrow', () => {
      const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
      expect(daysPassedSince(tomorrow)).toBe(0);
    });
  });

  describe('dayLeftUntil', () => {
    it('should return 0 for today', () => {
      const today = dayjs().format('YYYY-MM-DD');
      expect(dayLeftUntil(today)).toBe(0);
    });

    it('should return 1 for tomorrow', () => {
      const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
      expect(dayLeftUntil(tomorrow)).toBe(1);
    });

    it('should return 0 for yesterday', () => {
      const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      expect(dayLeftUntil(yesterday)).toBe(0);
    });
  });

  describe('getToday', () => {
    it('should return the correct today', () => {
      const today = dayjs().format('YYYY-MM-DD');
      expect(getToday()).toBe(today);
    });
  });

  describe('getDateAfterToday', () => {
    it('should return the correct date after today', () => {
      const date = dayjs().add(1, 'day').format('YYYY-MM-DD');
      expect(getDateAfterToday(1)).toBe(date);
    });
  });

  describe('formateDate', () => {
    it('should return the correct date', () => {
      const date = dayjs().format('YYYY-MM-DD');
      expect(formateDate(date)).toBe(date);
    });
  });
});
