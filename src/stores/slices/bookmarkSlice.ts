import { StateCreator } from 'zustand';
import { ClientStore } from '../clientStore';

type BookmarkState = {
  bookmarks: { [recipeKey: string]: boolean };
};

type BookmarkAction = {
  hasBookmark: (recipeKey: string) => boolean;
  addBookmark: (recipeKey: string) => void;
  removeBookmark: (recipeKey: string) => void;
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
  addBookmark: (recipeKey) =>
    set(
      (state) => {
        state.bookmarks[recipeKey] = true;
      },
      undefined,
      'bookmark/addBookmark',
    ),
  removeBookmark: (recipeKey) =>
    set(
      (state) => {
        state.bookmarks[recipeKey] = false;
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
