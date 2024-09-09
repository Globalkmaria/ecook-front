export const getArrayOrMessage = (array: string[]): string => {
  if (array.length === 0) return '';
  if (array.length === 1) return array[0];

  return array.slice(0, -1).join(', ') + ' or ' + array[array.length - 1];
};

export const getArrayAndMessage = (array: string[]): string => {
  if (array.length === 0) return '';
  if (array.length === 1) return array[0];

  return array.slice(0, -1).join(', ') + ' and ' + array[array.length - 1];
};

export const getArrayAndWithBeVerbMessage = (array: string[]): string => {
  if (array.length === 0) return '';
  if (array.length === 1) return array[0] + ' is';

  return (
    array.slice(0, -1).join(', ') + ' and ' + array[array.length - 1] + ' are'
  );
};
