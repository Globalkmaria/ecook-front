import { BookmarkStore } from './bookmarkSlice';
import { CartIngredient } from './cartSlice';

export const getBookmarkedRecipes = (bookmarks: BookmarkStore['bookmarks']) => {
  const init: string[] = [];

  const result = Object.entries(bookmarks).reduce((acc, [key, value]) => {
    value && acc.push(key);
    return acc;
  }, init);

  return result;
};

export const isCartIngredientEmpty = (ingredient: CartIngredient) => {
  return !Object.keys(ingredient.products).length && !ingredient.quantity;
};
