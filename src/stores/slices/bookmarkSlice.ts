import { StateCreator } from 'zustand';
import { ClientStore } from '../clientStore';
import { getBookmarkedRecipes } from './helper';

type BookmarkState = {
  bookmarks: { [recipeKey: string]: boolean };
};

type BookmarkAction = {
  hasBookmark: (bookmark: string) => boolean;
  getBookmarks: () => string[];
  addBookmark: (bookmark: string) => void;
  removeBookmark: (bookmark: string) => void;
  resetBookmarks: () => void;
};

export type BookmarkStore = BookmarkState & BookmarkAction;

const initialBookmarkState: BookmarkState = {
  bookmarks: {},
};

export const createBookmarkSlice: StateCreator<
  ClientStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  BookmarkStore
> = (set, get) => ({
  ...initialBookmarkState,
  hasBookmark: (recipeKey) => get().bookmarks[recipeKey] ?? false,
  getBookmarks: () => getBookmarkedRecipes(get().bookmarks),

  addBookmark: (recipeKey) =>
    set(
      (state) => {
        state.bookmarks[recipeKey] = true;
      },
      undefined,
      'bookmark/addBookmark',
    ),
  removeBookmark: (bookmark) =>
    set(
      (state) => {
        state.bookmarks[bookmark] = false;
      },
      undefined,
      'bookmark/removeBookmark',
    ),
  resetBookmarks: () =>
    set(
      (state) => {
        state.bookmarks = {};
      },
      undefined,
      'bookmark/resetBookmarks',
    ),
});
