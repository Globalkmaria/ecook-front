export const getLimitedText = (text: string, limit: number): string => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

export const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getLimitedWords = (text: string, limit: number): string[] => {
  const splittedWord = text.split(' ');
  return splittedWord.length > limit
    ? [...splittedWord.slice(0, limit - 1), `${splittedWord[limit - 1]}...`]
    : splittedWord;
};

export const pluralize = (text: string, count: number): string =>
  count > 1 ? text + 's' : text;
