import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import style from './style.module.scss';

import { getProfile } from '@/services/requests/users';
import { getHomeRecipes } from '@/services/requests/home';
import { PRODUCT_TYPES } from '@/services/requests/products';

import { ECOOK_LOGO_URL } from '@/const/contLinks';

import {
  productsOptions,
  recipeListOptions,
  profileOptions,
} from '@/queries/options';

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

  const users = new Set(result.data.map((recipe) => recipe.user.username));

  return [...users].map((username) => ({ username }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;

  const result = await getProfile(username);

  if (!result.ok) return {};

  const data = result.data;
  return {
    title: `${data.username}`,
    description: `Check out recipes shared by ${data.username} on E-COOK.`,
    openGraph: {
      images: [
        {
          url: data.img ?? ECOOK_LOGO_URL,
          width: 600,
          height: 400,
        },
      ],
    },
  };
}

async function UserPage({ params }: Props) {
  const { username } = await params;
  if (!username) return notFound();

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      profileOptions({
        username,
        staleTime: 180000, // 3 minutes
      }),
    ),
    queryClient.prefetchQuery(
      recipeListOptions({
        query: username,
        type: 'username',
        staleTime: 180000, // 3 minutes
      }),
    ),
    queryClient.prefetchQuery(
      productsOptions({
        type: PRODUCT_TYPES.USERNAME,
        q: username || '',
        staleTime: 180000,
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
