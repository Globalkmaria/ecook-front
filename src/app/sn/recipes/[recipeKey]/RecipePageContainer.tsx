'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { recipeOptions } from '@/queries/options';

import Recipe from './Recipe';
import Recommend from './Recommend';
import { RecipePageParams } from './page';

function RecipePageContainer() {
  const params = useParams<RecipePageParams>();
  const { data: recipe, isError } = useQuery(
    recipeOptions({ key: params.recipeKey }),
  );

  if (isError) throw new Error('Failed to load recipe');
  if (!recipe) return notFound();

  return (
    <div>
      <Recipe recipe={recipe} />
      <Recommend />
    </div>
  );
}

export default RecipePageContainer;
