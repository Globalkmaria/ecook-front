export const formatTimeUnit = (
  value: number,
  singular: string,
  plural: string,
) => (value ? `${value} ${value > 1 ? plural : singular}` : '');

export const formatHours = (hours: number) =>
  formatTimeUnit(hours, 'hr', 'hrs');

export const formatMinutes = (minutes: number) =>
  formatTimeUnit(minutes, 'min', 'mins');
