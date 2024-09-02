export const RECIPE_TABS = ['Ingredients', 'Steps'] as const;

export type RecipeTab = (typeof RECIPE_TABS)[number];
