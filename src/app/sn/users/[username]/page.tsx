import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/queries/get-query-client';
import {
  productsOptions,
  recipesOptions,
  profileOptions,
} from '@/queries/options';

import { ECOOK_LOGO_URL } from '@/const/contLinks';
import { getHomeRecipes } from '@/services/requests/home';
import { PRODUCT_TYPES } from '@/services/requests/products';
import { getProfile } from '@/services/requests/users';

import style from './style.module.scss';
import UserContent from './UserContent';
import UserProfile from './UserProfile';

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

  if (!result.ok) {
    return {
      title: 'User Not Found - E-COOK',
      description: 'The requested user could not be found.',
    };
  }

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

  // Check if user exists before prefetching queries
  const profileResult = await getProfile(username);
  if (!profileResult.ok) {
    // If user not found (404), trigger not-found page
    if (profileResult.res?.status === 404) {
      notFound();
    }
    // For other errors, continue but don't prefetch profile
  }

  const queryClient = getQueryClient();

  // Only prefetch profile if it exists
  if (profileResult.ok) {
    queryClient.prefetchQuery(
      queryOptions(
        profileOptions({
          username,
        }),
      ),
    );
  }

  queryClient.prefetchQuery(
    queryOptions(
      recipesOptions({
        query: username,
        type: 'username',
      }),
    ),
  );
  queryClient.prefetchQuery(
    queryOptions(
      productsOptions({
        type: PRODUCT_TYPES.USERNAME,
        q: username,
      }),
    ),
  );

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
