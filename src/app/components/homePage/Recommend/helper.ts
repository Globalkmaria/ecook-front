import { getSearchTagLink, getSearchIngredientLink } from '@/helpers/links';

import { RecipeRecommendations } from '@/services/requests/recommend/type';

export const transformRecommendRecipeData = (data: RecipeRecommendations) => {
  const types = Object.keys(data);

  const result = types.map((type) => ({
    title: type[0].toLocaleUpperCase() + type.slice(1),
    groupedRecipesByType: data[type].recipes,
    options: data[type].order,
  }));

  return result;
};

export const getSeeMoreLink = (type: string, query: string) => {
  const link = type.toLowerCase().includes('tag')
    ? getSearchTagLink(query)
    : getSearchIngredientLink(query);
  return link;
};
