import dayjs from 'dayjs';

import { validatePositiveInteger } from './validation';

export const formatTimeUnit = (
  value: number,
  singular: string,
  plural: string,
) => (value ? `${value} ${value > 1 ? plural : singular}` : '');

export const formatHours = (hours: number) =>
  formatTimeUnit(hours, 'hr', 'hrs');

export const formatMinutes = (minutes: number) =>
  formatTimeUnit(minutes, 'min', 'mins');

export const formatTime = (time: { hours: number; minutes: number }) => {
  const hours = time.hours ? formatHours(time.hours) : '';
  const minutes = time.minutes ? formatMinutes(time.minutes) : '';

  const result = `${hours} ${minutes}`.trim();
  return result;
};

export const validateMinutes = (value: string) => {
  if (!validatePositiveInteger(value) || Number(value) > 59) return false;

  return true;
};

export const daysPassedSince = (inputDate: string) => {
  const today = dayjs();
  return today.diff(dayjs(inputDate), 'day') || 0;
};

export const dayLeftUntil = (inputDate: string) => {
  const today = dayjs();
  const targetDate = dayjs(inputDate);

  return targetDate.diff(today, 'day') || 0;
};
