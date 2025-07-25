'use client';

import { useParams } from 'next/navigation';

import { recipesOptions } from '@/queries/options';

import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { useClientStore } from '@/providers/client-store-provider';
import { GetRecipesRes } from '@/services/requests/recipes/type';

import { UserPageParams } from '../page';
import Cards, { CardListSkeleton } from './Cards';
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
        staleTime: isUserProfile ? 0 : 1000 * 60 * 60, // 1 hour
        gcTime: isUserProfile ? 0 : 1000 * 60 * 60, // 1 hour
      })}
      fallback={<CardListSkeleton count={5} />}
      errorFallback={() => <p>Failed to get recipes.</p>}
    >
      {(data) => <RecipeListBody data={data} />}
    </SuspenseQuery>
  );
}

export default RecipeList;

function RecipeListBody({ data }: { data: GetRecipesRes }) {
  if (!data?.search?.length) return <NoContent />;

  return <Cards recipes={data?.search ?? []} />;
}
