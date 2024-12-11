'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { NewRecipeData, RecipeDetail } from '@/service/recipes/type';
import { editRecipe, getRecipe } from '@/service/recipes';

import useHandleAuthResponse from '@/hooks/useHandleAuthResponse';

import NewRecipe from '@/app/recipes/new/NewRecipe';
import { OnSubmitNewRecipe } from '@/app/recipes/new/NewRecipeContainer';

import {
  getEditRecipeFormData,
  getEditRecipeInitialValues,
  isRequiredFieldsFilled,
} from './helper';
import Skeleton from '@/components/Skeleton';

export type EditRecipeData = Omit<NewRecipeData, 'img'>;

interface Props {
  recipeKey: string;
  onCloseModal: () => void;
}

function RecipeEdit({ recipeKey, onCloseModal }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const { handleAuthResponse } = useHandleAuthResponse();

  const onSubmit: OnSubmitNewRecipe = async (data) => {
    if (loading) return;
    if (!isRequiredFieldsFilled(data)) {
      alert(FILL_REQUIRED_FIELDS);
      return;
    }

    setLoading(true);
    const formData = getEditRecipeFormData(data);

    await handleAuthResponse({
      request: editRecipe(formData, recipeKey),
      options: {
        onSuccess: (res) => {
          onCloseModal();
          router.refresh();
        },
        onFailure: () => {
          alert('Failed to edit recipe');
          onCloseModal();
          setLoading(false);
        },
      },
    });
  };

  const getRecipeData = async () => {
    const result = await getRecipe(recipeKey);

    if (!result.ok) {
      alert(GET_RECIPE_ERROR_MESSAGE);
      onCloseModal();
      return null;
    }

    setRecipe(result.data);
    setLoadingRecipe(false);
  };

  useEffect(() => {
    getRecipeData();
  }, []);

  if (loadingRecipe) return <Loading />;
  if (!recipe) return <div>Recipe not found</div>;

  const initialData = getEditRecipeInitialValues(recipe);

  return (
    <div className={style.container}>
      <NewRecipe
        loading={loading}
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
