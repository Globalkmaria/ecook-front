'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { recipeRecommendOptions } from '@/queries/options';

import RecipeRecommend from '@/app/components/common/RecipeRecommend';

import { RecipePageParams } from '../page';

function Recommend() {
  const params = useParams<RecipePageParams>();
  const result = useQuery(recipeRecommendOptions({ key: params.recipeKey }));

  return <RecipeRecommend {...result} />;
}

export default Recommend;
