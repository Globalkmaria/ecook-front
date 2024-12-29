export const lightSlugify = (text: string) => {
  return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
};

export const replaceHyphensWithSpaces = (text: string) =>
  text.replace(/-/g, ' ');

export const lightTrim = (text: string) => text.trim();
