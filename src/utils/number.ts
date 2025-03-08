export const getSign = (number: number) =>
  Math.sign(number) === -1 ? '-' : '+';
