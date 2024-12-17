'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { RecipeSimple } from '@/service/recipes/type';

import { recipeListOptions } from '@/query/recipeListOptions';

import { getUserInfo } from '@/helpers/auth';

import Cards from './Cards/Cards';
import { UserPageParams } from './page';

interface Props {
  recipes: RecipeSimple[];
}

function RecipeList({ recipes }: Props) {
  const userInfo = getUserInfo();
  const params = useParams<UserPageParams>();
  const [isClient, setIsClient] = useState(false);
  const isLoggedInUserPage = params.username === userInfo.username;

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  const { data, error } = useQuery(
    recipeListOptions({
      query: params.username || '',
      type: 'username',
      enabled: isLoggedInUserPage,
      initialData: recipes,
    }),
  );

  if (!isClient) return null;

  if (error) return notFound();

  return <Cards recipes={data} />;
}

export default RecipeList;
