import { lightTrim, replaceHyphensWithSpaces } from '@/utils/normalize';

import {
  SEARCH_MENU_DEFAULT,
  SEARCH_MENU_VALUES,
  SearchMenuValue,
} from '@/const/searchMenu';

export const getSearchQuery = (value: string | null) =>
  lightTrim(replaceHyphensWithSpaces(value ?? ''));

const isSearchMenuType = (value: string): value is SearchMenuValue =>
  SEARCH_MENU_VALUES.includes(value as SearchMenuValue);

export const getSearchMenuItem = (value: string | null) =>
  value && isSearchMenuType(value) ? value : SEARCH_MENU_DEFAULT;
