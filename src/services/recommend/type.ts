export interface RecommendRecipe {
  name: string;
  key: string;
  img: string;
  user: { username: string; img?: string | null };
}

export interface RecipeRecommendations {
  type: string;
  recipes: RecommendRecipe[];
}
