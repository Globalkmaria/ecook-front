'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { recipeListOptions } from '@/queries/recipeListOptions';

import Cards from './Cards/Cards';
import { UserPageParams } from './page';

function RecipeList() {
  const params = useParams<UserPageParams>();

  const { data, error } = useQuery(
    recipeListOptions({
      query: params.username || '',
      type: 'username',
      staleTime: 180000, // 3 minutes
    }),
  );

  if (error) return notFound();

  return <Cards recipes={data ?? []} />;
}

export default RecipeList;
