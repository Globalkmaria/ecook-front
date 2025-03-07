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
  const { data, isError, isLoading } = useQuery(
    pantryBoxRecommendOptions({ pantryBoxKey, query }),
  );

  if (isLoading) return <div>Loading... </div>;
  if (isError || !data) {
    console.error('Failed to fetch pantry box recommendations');
    return null;
  }
  return <RecipeRecommend data={data} />;
}

export default PantryBoxRecipeRecommend;
