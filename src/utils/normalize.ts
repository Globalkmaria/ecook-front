export const lightSlugify = (text: string) => {
  return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
};
