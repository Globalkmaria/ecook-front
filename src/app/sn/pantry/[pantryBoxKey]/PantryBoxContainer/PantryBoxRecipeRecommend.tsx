'use client';

import { useParams } from 'next/navigation';

import { pantryBoxRecommendOptions } from '@/queries/options/recommend/pantryBoxRecommendOptions';

import RecipeRecommend from '@/app/components/common/RecipeRecommend';

import { useClientStore } from '@/providers/client-store-provider';

import { PantryBoxPageParams } from '../page';

function PantryBoxRecipeRecommend() {
  const { pantryBoxKey } = useParams<PantryBoxPageParams>();
  const pantryBox = useClientStore(
    (state) => state.pantry.pantryBoxes[pantryBoxKey],
  );

  const query = {
    ingredientKey: pantryBox?.ingredientKey,
    productKey: pantryBox?.productKey,
  };

  return (
    <RecipeRecommend
      queryOptions={pantryBoxRecommendOptions({ pantryBoxKey, query })}
    />
  );
}

export default PantryBoxRecipeRecommend;
