import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import style from './style.module.scss';

import { getProfile } from '@/services/users';
import { getHomeRecipes } from '@/services/recipes';

import { recipeListOptions } from '@/queries/recipeListOptions';
import { profileOptions } from '@/queries/profileOptions';

import UserProfile from './UserProfile';
import UserContent from './UserContent';

export type UserPageParams = {
  username: string;
};

interface Props {
  params: Promise<UserPageParams>;
}

export const revalidate = 86400; // 1 day

export async function generateStaticParams() {
  const result = await getHomeRecipes();
  if (!result.ok) return [];

  const users = new Set(
    result.data.map((recipe) => ({
      username: recipe.user.username,
    })),
  );

  return [...users];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;

  const result = await getProfile(username);

  if (!result.ok) return {};

  const data = result.data;
  return {
    title: `User Profile - Explore Recipes by ${data.username} | E-COOK`,
    description: `Check out recipes shared by ${data.username} on E-COOK. Discover their culinary creations and find inspiration for your next meal.'`,
  };
}

async function UserPage({ params }: Props) {
  const { username } = await params;
  if (!username) return notFound();

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      recipeListOptions({
        query: username || '',
        type: 'username',
        staleTime: 180000, // 3 minutes
      }),
    ),
    queryClient.prefetchQuery(
      profileOptions({
        username,
        staleTime: 180000, // 3 minutes
      }),
    ),
  ]);

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserProfile />
          <hr className={style.border} />
          <UserContent />
        </HydrationBoundary>
      </div>
    </main>
  );
}

export default UserPage;
