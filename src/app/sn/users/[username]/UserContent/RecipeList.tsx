'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { recipeListOptions } from '@/queries/recipeListOptions';

import { useClientStore } from '@/providers/client-store-provider';

import { UserPageParams } from '../page';

import Cards from './Cards';
import NoContent from './NoContent';

function RecipeList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const { data, error } = useQuery(
    recipeListOptions({
      query: params.username || '',
      type: 'username',
      enabled: isUserProfile,
    }),
  );

  if (error) return notFound();
  if (data?.search?.length === 0) return <NoContent />;

  return <Cards recipes={data?.search ?? []} />;
}

export default RecipeList;
