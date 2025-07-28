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
  const today = getTodayDayJs();
  const diff = today.diff(dayjs(inputDate), 'day');

  return diff > 0 ? diff : 0;
};

export const dayLeftUntil = (inputDate: string) => {
  const today = getTodayDayJs();
  const targetDate = dayjs(inputDate);

  const diff = targetDate.diff(today, 'day');

  return diff > 0 ? diff : 0;
};

export const getToday = () => dayjs().format('YYYY-MM-DD');
const getTodayDayJs = () => dayjs(getToday());

export const getDateAfterToday = (days: number) =>
  dayjs().add(days, 'day').format('YYYY-MM-DD');

export const formateDate = (date: string) => dayjs(date).format('YYYY-MM-DD');
