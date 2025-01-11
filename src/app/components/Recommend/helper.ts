import { RecipeRecommendations } from '@/services/recommend/type';

export type GroupedRecipesByType = Record<
  string,
  RecipeRecommendations['recipes']
>;

export const groupRecipesByType = (data: RecipeRecommendations[]) => {
  const groupedRecipesByType = data.reduce((acc, curr) => {
    acc[curr.type] = curr.recipes;
    return acc;
  }, {} as GroupedRecipesByType);

  const types = Object.keys(groupedRecipesByType);

  return { groupedRecipesByType, types };
};
