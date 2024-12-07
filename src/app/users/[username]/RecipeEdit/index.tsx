'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { NewRecipeData, RecipeDetail } from '@/service/recipes/type';
import { editRecipe, getRecipe } from '@/service/recipes';

import NewRecipe from '@/app/recipes/new/NewRecipe';
import { OnSubmitNewRecipe } from '@/app/recipes/new/NewRecipeContainer';
import {
  appendProductImgsToFormData,
  appendRecipeImgToFormData,
  getEditRecipeInfoData,
  getEditRecipeInitialValues,
  getNewProducts,
  isRequiredFieldsFilled,
} from './helper';
import useHandleAuthResponse from '@/hooks/useHandleAuthResponse';

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

  const onSubmit: OnSubmitNewRecipe = async ({
    img,
    ingredients,
    steps,
    textInputs,
    tags,
  }) => {
    if (
      !isRequiredFieldsFilled({ img, ingredients, steps, textInputs, tags })
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    const newProducts = getNewProducts(ingredients);
    appendProductImgsToFormData(newProducts, formData);
    appendRecipeImgToFormData(img, formData);

    const data = getEditRecipeInfoData({
      textInputs,
      steps,
      ingredients,
      tags,
    });

    formData.append('info', JSON.stringify(data));

    setLoading(true);
    await handleAuthResponse({
      request: editRecipe(formData, recipeKey),
      options: {
        onSuccess: (res) => {
          onCloseModal();
          router.refresh();
        },
      },
    });

    setLoading(false);
  };

  const getRecipeData = async () => {
    const result = await getRecipe(recipeKey);

    if (!result.ok) {
      alert('Something went wrong while getting the recipe.');
      onCloseModal();
      return null;
    }

    setRecipe(result.data);
    setLoadingRecipe(false);
  };

  useEffect(() => {
    getRecipeData();
  }, []);

  if (loadingRecipe || !recipe) return null;

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
