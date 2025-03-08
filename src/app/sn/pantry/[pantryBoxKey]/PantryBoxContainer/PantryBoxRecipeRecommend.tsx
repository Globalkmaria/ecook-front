'use client';

import RecipeRecommend from '@/app/components/common/RecipeRecommend';
import { useClientStore } from '@/providers/client-store-provider';
import { PantryBoxPageParams } from '../page';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { pantryBoxRecommendOptions } from '@/queries/options/recommend/pantryBoxRecommendOptions';

function PantryBoxRecipeRecommend() {
  const { pantryBoxKey } = useParams<PantryBoxPageParams>();
  const pantryBox = useClientStore(
    (state) => state.pantry.pantryBoxes[pantryBoxKey],
  );

  const query = {
    ingredientKey: pantryBox?.ingredientKey,
    productKey: pantryBox?.productKey,
  };

  const result = useQuery(pantryBoxRecommendOptions({ pantryBoxKey, query }));
  return <RecipeRecommend {...result} />;
}

export default PantryBoxRecipeRecommend;
