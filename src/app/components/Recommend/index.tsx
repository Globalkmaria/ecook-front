import { getHomeRecommendations } from '@/services/recommend';

import RecommendContainer from './RecommendContainer';
import { groupRecipesByType } from './helper';

async function Recommend() {
  const recommendation = await getHomeRecommendations();
  if (!recommendation.ok) return null;

  const { groupedRecipesByType, types } = groupRecipesByType(
    recommendation.data,
  );

  return (
    <RecommendContainer
      groupedRecipesByType={groupedRecipesByType}
      types={types}
    />
  );
}

export default Recommend;
