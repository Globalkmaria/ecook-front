import { SEARCH_MENU_DEFAULT, SEARCH_MENU_VALUES } from '@/const/searchMenu';
import { lightTrim, replaceHyphensWithSpaces } from '@/utils/normalize';

export const getSearchQuery = (value: string | null) =>
  lightTrim(replaceHyphensWithSpaces(value ?? ''));

export const getSearchMenuItem = (value: string | null) =>
  value && SEARCH_MENU_VALUES.includes(value) ? value : SEARCH_MENU_DEFAULT;
