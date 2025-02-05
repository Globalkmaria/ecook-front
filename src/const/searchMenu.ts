export const SEARCH_MENU_ITEMS = [
  { label: 'Title', value: 'name' },
  { label: 'Tag', value: 'tag' },
  { label: 'Ingredient', value: 'ingredient' },
  { label: 'Product', value: 'product' },
] as const;

export const SEARCH_MENU_ITEMS_MAP: { [key: string]: string } =
  SEARCH_MENU_ITEMS.reduce(
    (acc, item) => ({ ...acc, [item.value]: item.label }),
    {},
  );

export const SEARCH_MENU_DEFAULT = SEARCH_MENU_ITEMS[0].value;
export const SEARCH_MENU_VALUES = SEARCH_MENU_ITEMS.map((item) => item.value);

export type SearchMenuValue = (typeof SEARCH_MENU_VALUES)[number];
