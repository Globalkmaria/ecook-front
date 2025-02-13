import { BookmarkStore } from './bookmarkSlice';

export const getBookmarkedRecipes = (bookmarks: BookmarkStore['bookmarks']) => {
  const init: string[] = [];

  const result = Object.entries(bookmarks).reduce((acc, [key, value]) => {
    value && acc.push(key);
    return acc;
  }, init);

  return result;
};
