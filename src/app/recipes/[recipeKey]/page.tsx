import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getHomeRecipes, getRecipe } from '@/service/recipes';

import { capitalizeFirstLetter } from '@/utils/text';

import Recipe from './Recipe';

export const revalidate = 10800; // 3 hours

export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await getHomeRecipes();
  if (!result.ok) return [];
  return (
    result.data?.map((recipe) => ({
      recipeKey: recipe.key,
    })) ?? []
  );
}

interface Props {
  params: Promise<{ recipeKey: string }>;
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
  if (!recipeKey) {
    redirect('/');
  }

  const result = await getRecipe(recipeKey);
  if (!result.ok) {
    redirect('/');
  }

  return <Recipe recipe={result.data} />;
}

export default Page;
