import {
  SEARCH_MENU_DEFAULT,
  SEARCH_MENU_VALUES,
} from '@/app/const/searchMenu';

export const getSearchQuery = (value: string | null) => value ?? '';
export const getSearchMenuItem = (value: string | null) =>
  value && SEARCH_MENU_VALUES.includes(value) ? value : SEARCH_MENU_DEFAULT;
