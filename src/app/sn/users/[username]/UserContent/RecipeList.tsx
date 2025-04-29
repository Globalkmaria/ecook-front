'use client';

import { notFound, useParams } from 'next/navigation';

import { recipesOptions } from '@/queries/options';

import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { useClientStore } from '@/providers/client-store-provider';
import { GetRecipesRes } from '@/services/requests/recipes/type';

import { UserPageParams } from '../page';
import Cards from './Cards';
import NoContent from './NoContent';

function RecipeList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  return (
    <SuspenseQuery
      {...recipesOptions({
        query: params.username,
        type: 'username',
        enabled: isUserProfile,
      })}
      errorFallback={() => <p>Failed to get recipes.</p>}
    >
      {(data) => <RecipeListBody data={data} />}
    </SuspenseQuery>
  );
}

export default RecipeList;

function RecipeListBody({ data }: { data: GetRecipesRes }) {
  if (!data) return notFound();
  if (data?.search?.length === 0) return <NoContent />;

  return <Cards recipes={data?.search ?? []} />;
}
