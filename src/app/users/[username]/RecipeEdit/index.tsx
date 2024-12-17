'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { NewRecipeData } from '@/service/recipes/type';

import { recipeOptions } from '@/query/recipeOptions';
import useEditRecipeMutation from '@/query/hook/useEditRecipeMutation';

import { getUserInfo } from '@/helpers/auth';

import Skeleton from '@/components/Skeleton';

import NewRecipe from '@/app/recipes/new/NewRecipe';
import { OnSubmitNewRecipe } from '@/app/recipes/new/NewRecipeContainer';

import {
  getEditRecipeFormData,
  getEditRecipeInitialValues,
  isRequiredFieldsFilled,
} from './helper';

export type EditRecipeData = Omit<NewRecipeData, 'img'>;

interface Props {
  recipeKey: string;
  onCloseModal: () => void;
}

function RecipeEdit({ recipeKey, onCloseModal }: Props) {
  const { isLoggedIn } = getUserInfo();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  const {
    data: recipe,
    isLoading: isLoadingRecipe,
    error: recipeError,
  } = useQuery(recipeOptions(recipeKey, isLoggedIn));
  const { mutate, isPending: isPendingEditRecipe } = useEditRecipeMutation(
    recipeKey,
    onCloseModal,
  );

  const onSubmit: OnSubmitNewRecipe = (data) => {
    if (isPendingEditRecipe) return;
    if (!isRequiredFieldsFilled(data)) {
      alert(FILL_REQUIRED_FIELDS);
      return;
    }

    const formData = getEditRecipeFormData(data);
    mutate({ data: formData });
  };

  if (!isClient) return null;

  if (isLoadingRecipe) return <Loading />;

  if (recipeError) {
    alert(GET_RECIPE_ERROR_MESSAGE);
    onCloseModal();
    return null;
  }

  if (!recipe) return <div>Recipe not found</div>;

  const initialData = getEditRecipeInitialValues(recipe);

  return (
    <div className={style.container}>
      <NewRecipe
        loading={isPendingEditRecipe}
        onSubmit={onSubmit}
        initialData={initialData}
        pageTitle='Edit Recipe'
      />
    </div>
  );
}

export default RecipeEdit;

export const Loading = () => (
  <div className={style.loading}>
    <Skeleton />
  </div>
);

// Error messages

const FILL_REQUIRED_FIELDS = 'Please fill in all required fields';
const GET_RECIPE_ERROR_MESSAGE =
  'Something went wrong while getting the recipe.';
