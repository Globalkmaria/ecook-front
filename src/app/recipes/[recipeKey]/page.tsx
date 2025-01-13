import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getHomeRecipes } from '@/services/recipes';
import { getRecipe } from '@/services/recipe';

import { capitalizeFirstLetter } from '@/utils/text';

import RecipePageContainer from './RecipePageContainer';

export const revalidate = 86400; // 1 day

export async function generateStaticParams() {
  const result = await getHomeRecipes();
  if (!result.ok) return [];

  return (
    result.data?.map((recipe) => ({
      recipeKey: recipe.key,
    })) ?? []
  );
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
  };
}

async function Page({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) notFound();

  return <RecipePageContainer />;
}

export default Page;
