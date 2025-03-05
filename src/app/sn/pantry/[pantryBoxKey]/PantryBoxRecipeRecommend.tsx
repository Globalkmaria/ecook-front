import RecipeRecommend from '@/app/components/common/RecipeRecommend';
import { RECIPE_RECOMMEND_LIST_MOCK_DATA } from '@/app/components/common/RecipeRecommend/mockData';

function PantryBoxRecipeRecommend() {
  return <RecipeRecommend data={RECIPE_RECOMMEND_LIST_MOCK_DATA} />;
}

export default PantryBoxRecipeRecommend;
