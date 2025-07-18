import { Metadata } from 'next';

import { capitalizeFirstLetter } from '@/utils/text';

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

  return <RecipePageContainer recipeKey={recipeKey} />;
}

export default Page;
