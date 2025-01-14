'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { recipeOptions } from '@/queries/recipeOptions';

import Recipe from './Recipe';
import Recommend from './Recommend';
import { RecipePageParams } from './page';

function RecipePageContainer() {
  const params = useParams<RecipePageParams>();
  const { data: recipe, isError } = useQuery(
    recipeOptions({ key: params.recipeKey }),
  );
  if (!recipe || isError) return null;

  return (
    <div>
      <Recipe recipe={recipe} />
      <Recommend />
    </div>
  );
}

export default RecipePageContainer;
