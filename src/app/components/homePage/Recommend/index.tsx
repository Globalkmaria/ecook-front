import { getHomeRecommendations } from '@/services/requests/recommend';

import { transformRecommendRecipeData } from './helper';
import RecommendContainer from './RecommendContainer';

async function Recommend() {
  const recommendation = await getHomeRecommendations();
  if (!recommendation.ok) return null;

  const recommendations = transformRecommendRecipeData(recommendation.data);

  return (
    <>
      {recommendations.map((recommendation) => (
        <RecommendContainer
          key={recommendation.title}
          title={recommendation.title}
          groupedRecipesByType={recommendation.groupedRecipesByType}
          options={recommendation.options}
        />
      ))}
    </>
  );
}

export default Recommend;
