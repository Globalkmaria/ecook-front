export interface RecommendRecipe {
  name: string;
  key: string;
  img: string;
}

export interface RecipeRecommendations {
  type: string;
  recipes: RecommendRecipe[];
}
