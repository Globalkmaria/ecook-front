'use client';

import { RecipePageParams } from '../page';
import { recipeRecommendOptions } from '@/queries/options';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import RecipeRecommend from '@/app/components/common/RecipeRecommend';

function Recommend() {
  const params = useParams<RecipePageParams>();
  const result = useQuery(recipeRecommendOptions({ key: params.recipeKey }));

  return <RecipeRecommend {...result} />;
}

export default Recommend;
