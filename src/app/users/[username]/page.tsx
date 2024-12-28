import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import style from './style.module.scss';

import { getProfile } from '@/service/users';
import { getHomeRecipes } from '@/service/recipes';

import { recipeListOptions } from '@/query/recipeListOptions';

import { AvatarImg } from '@/components/Avatar';
import Icon from '@/components/Icon';

import RecipeList from './RecipeList';

export type UserPageParams = {
  username: string;
};

interface Props {
  params: Promise<UserPageParams>;
}

export const revalidate = 86400; // 1 day

export const dynamicParams = true;

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

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <Header username={username} />
        <hr className={style.border} />
        <List username={username} />
      </div>
    </main>
  );
}

export default UserPage;

async function Header({ username }: { username: string }) {
  const { ok, data: profile } = await getProfile(username);

  if (!ok) return notFound();
  const imgUser = {
    img: profile.img ?? null,
    username: profile.username,
  };

  return (
    <header className={style.profile}>
      <div className={style.avatar}>
        <AvatarImg user={imgUser} size={100} />
      </div>
      <div className={style.info}>
        <span className={style.username}>{profile.username}</span>
        <span>
          <span className={style.recipes}>{profile.totalPosts}</span>
          {` recipes`}
        </span>
      </div>
    </header>
  );
}

async function List({ username }: { username: string }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    recipeListOptions({
      query: username || '',
      type: 'username',
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <div className={style.tabs}>
          <span className={style.tab}>
            <Icon icon='grid' /> RECIPES
          </span>
        </div>
        <RecipeList />
      </section>
    </HydrationBoundary>
  );
}
