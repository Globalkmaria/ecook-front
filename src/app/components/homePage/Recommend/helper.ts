import { RecipeRecommendations } from '@/services/requests/recommend/type';

export const transformRecommendRecipeData = (data: RecipeRecommendations) => {
  const types = Object.keys(data);

  const result = types.map((type) => ({
    title: type[0].toLocaleUpperCase() + type.slice(1),
    groupedRecipesByType: data[type],
    options: Object.keys(data[type]),
  }));

  return result;
};
