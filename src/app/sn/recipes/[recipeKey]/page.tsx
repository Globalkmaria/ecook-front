import { Metadata } from 'next';

import { generateRecipeMetadata } from '@/utils/seo';

import RobotsMeta from '@/components/seo/RobotsMeta';

import { getHomeRecipes } from '@/services/requests/home';
import { getRecipe } from '@/services/requests/recipe';

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

  if (!result.ok)
    return {
      title: 'Recipe Not Found - E-COOK',
      description: 'The requested recipe could not be found.',
    };

  const recipe = result.data;
  return generateRecipeMetadata(recipe);
}

async function Page({ params }: Props) {
  const { recipeKey } = await params;

  return (
    <>
      <RecipePageContainer recipeKey={recipeKey} />
      <RobotsMeta />
    </>
  );
}

export default Page;
