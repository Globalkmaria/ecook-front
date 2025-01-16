import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getHomeRecipes } from '@/services/recipes';
import { getRecipe } from '@/services/recipe';

import { recipeOptions } from '@/queries/recipeOptions';
import { recipeRecommendOptions } from '@/queries/recipeRecommendOptions';

import { capitalizeFirstLetter } from '@/utils/text';

import RecipePageContainer from './RecipePageContainer';

export const revalidate = 86400; // 1 day

export async function generateStaticParams() {
  const result = await getHomeRecipes();
  if (!result.ok) return [];

  const recipeKeys =
    result.data?.map((recipe) => ({
      recipeKey: recipe.key,
    })) ?? [];
  return recipeKeys;
}

export type RecipePageParams = {
  recipeKey: string;
};

interface Props {
  params: Promise<RecipePageParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipeKey = (await params).recipeKey;

  const result = await getRecipe(recipeKey);

  if (!result.ok) return {};

  const recipe = result.data;
  return {
    title: `${capitalizeFirstLetter(recipe.name)} - E-COOK`,
    description: `Discover ${recipe.name} recipe. Learn how to make it step-by-step!`,
    openGraph: {
      images: [
        {
          url: recipe.img,
          width: 600,
          height: 400,
        },
      ],
    },
  };
}

async function Page({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) notFound();

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(recipeOptions({ key: recipeKey })),
    queryClient.prefetchQuery(recipeRecommendOptions({ key: recipeKey })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipePageContainer />
    </HydrationBoundary>
  );
}

export default Page;
