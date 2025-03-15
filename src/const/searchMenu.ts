export const SEARCH_MENU_ITEMS = [
  { label: 'Title', value: 'name', icon: 'abc' },
  { label: 'Tag', value: 'tag', icon: 'hashtag' },
  { label: 'Ingredient', value: 'ingredient', icon: 'fridge' },
  { label: 'Product', value: 'product', icon: 'barcode' },
] as const;

export const SEARCH_MENU_DEFAULT = SEARCH_MENU_ITEMS[0].value;
export const SEARCH_MENU_VALUES = SEARCH_MENU_ITEMS.map((item) => item.value);

export type SearchMenuValue = (typeof SEARCH_MENU_VALUES)[number];
