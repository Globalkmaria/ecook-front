'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { recipeListOptions } from '@/queries/recipeListOptions';

import { UserPageParams } from '../page';

import Cards from './Cards';
import { useClientStore } from '@/providers/client-store-provider';

function RecipeList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const { data, error } = useQuery(
    recipeListOptions({
      query: params.username || '',
      type: 'username',
      enabled: isUserProfile,
      staleTime: 180000, // 3 minutes
    }),
  );

  if (error) return notFound();

  return <Cards recipes={data ?? []} />;
}

export default RecipeList;
