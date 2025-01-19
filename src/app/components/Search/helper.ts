import { SEARCH_MENU_DEFAULT, SEARCH_MENU_VALUES } from '@/const/searchMenu';
import {
  lightSlugify,
  lightTrim,
  replaceHyphensWithSpaces,
} from '@/utils/normalize';

export const getSearchQuery = (value: string | null) =>
  lightTrim(replaceHyphensWithSpaces(value ?? ''));

export const getSearchMenuItem = (value: string | null) =>
  value && SEARCH_MENU_VALUES.includes(value) ? value : SEARCH_MENU_DEFAULT;

export const getSearchURL = (type: string, query: string) => {
  const sluggedQuery = lightSlugify(query);
  return `/sn/search?type=${type}&q=${sluggedQuery}`;
};
