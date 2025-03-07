import RecipeRecommend from '@/app/components/common/RecipeRecommend';
import { RECIPE_RECOMMEND_LIST_MOCK_DATA } from '@/app/components/common/RecipeRecommend/mockData';
import { getPantryBoxRecommendations } from '@/services/requests/recommend';

interface Props {
  pantryBoxKey: string;
}

async function PantryBoxRecipeRecommend({ pantryBoxKey }: Props) {
  const data = await getPantryBoxRecommendations(pantryBoxKey);
  if (!data.ok) {
    console.error('Failed to fetch pantry box recommendations');
    return null;
  }
  return <RecipeRecommend data={RECIPE_RECOMMEND_LIST_MOCK_DATA} />;
}

export default PantryBoxRecipeRecommend;
