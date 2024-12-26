'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { RecipeSimple } from '@/service/recipes/type';

import { recipeListOptions } from '@/query/recipeListOptions';

import Cards from './Cards/Cards';
import { UserPageParams } from './page';
import useIsClient from '@/hooks/useIsClient';

interface Props {
  recipes: RecipeSimple[];
}

function RecipeList({ recipes }: Props) {
  const isClient = useIsClient();
  const params = useParams<UserPageParams>();

  const { data, error } = useQuery(
    recipeListOptions({
      query: params.username || '',
      type: 'username',
      enabled: isClient,
      initialData: recipes,
      staleTime: 180000, // 3 minutes
    }),
  );

  if (error) return notFound();

  return <Cards recipes={data} />;
}

export default RecipeList;
