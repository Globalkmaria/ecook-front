'use client';

import { useParams } from 'next/navigation';

import { recipeRecommendOptions } from '@/queries/options';

import RecipeRecommend from '@/app/components/common/RecipeRecommend';

import { RecipePageParams } from '../page';

function Recommend() {
  const params = useParams<RecipePageParams>();

  return (
    <RecipeRecommend
      queryOptions={recipeRecommendOptions({ key: params.recipeKey })}
    />
  );
}

export default Recommend;
