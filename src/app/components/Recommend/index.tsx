import { getHomeRecommendations } from '@/services/recommend';

import RecommendContainer from './RecommendContainer';
import { transformRecommendRecipeData } from './helper';

async function Recommend() {
  const recommendation = await getHomeRecommendations();
  if (!recommendation.ok) return null;

  const recommendations = transformRecommendRecipeData(recommendation.data);

  return (
    <>
      {recommendations.map((recommendation) => (
        <RecommendContainer
          title={recommendation.title}
          groupedRecipesByType={recommendation.groupedRecipesByType}
          options={recommendation.options}
        />
      ))}
    </>
  );
}

export default Recommend;
