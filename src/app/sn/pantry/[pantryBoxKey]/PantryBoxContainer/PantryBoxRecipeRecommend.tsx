'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
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

  const result = useSuspenseQuery(
    pantryBoxRecommendOptions({ pantryBoxKey, query }),
  );
  return <RecipeRecommend {...result} />;
}

export default PantryBoxRecipeRecommend;
