'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { NewRecipeData } from '@/service/recipes/type';
import { saveRecipe } from '@/service/recipes';

import { getRandomId } from '@/utils/generateId';

import { getUserInfo } from '@/helpers/auth';

import useHandleAuthResponse from '@/hooks/useHandleAuthResponse';

import { Step } from './components/Steps';
import NewRecipe, {
  NewRecipeIngredientStates,
  NewRecipeInitialData,
  NewRecipeTags,
  TextInputs,
} from './NewRecipe';
import { getNewIngredient } from './helper';

export interface NewRecipeSubmitProps {
  img: File | string | null;
  ingredients: NewRecipeIngredientStates;
  steps: Step[];
  textInputs: TextInputs;
  tags: NewRecipeTags;
}

export type OnSubmitNewRecipe = (data: NewRecipeSubmitProps) => void;

function NewRecipeContainer() {
  const router = useRouter();
  const { username } = getUserInfo();
  const [loading, setLoading] = useState(false);
  const { handleAuthResponse } = useHandleAuthResponse();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!isClient) return null;

  if (!username) {
    return null;
  }

  const onSubmit = async ({
    img,
    ingredients,
    steps,
    textInputs,
    tags,
  }: NewRecipeSubmitProps) => {
    if (loading) return;
    if (!img || !ingredients.length || !steps.length) {
      alert('Please fill in all required fields');
      return;
    }

    const newProducts = ingredients
      .map((item) => item.newProduct)
      .filter((item) => !!item);

    const formData = new FormData();

    newProducts.forEach(
      (product) =>
        product.img && formData.append(`img_${product.id}`, product.img),
    );

    img && typeof img !== 'string' && formData.append('img', img);

    const data: Omit<NewRecipeData, 'img'> = {
      ...textInputs,
      steps: steps.map((item) => item.value),
      ingredients: ingredients.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        ingredientId: item.productId,
        newProduct: item.newProduct,
        productId: item.productId,
      })),
      tags: tags,
    };

    formData.append('info', JSON.stringify(data));

    setLoading(true);
    await handleAuthResponse({
      request: saveRecipe(formData),
      options: {
        onSuccess: (res) => router.replace(`/recipes/${res.data.key}`),
        onFailure: () => {
          alert('Failed to submit recipe');
          setLoading(false);
        },
      },
    });
  };

  const initialData: NewRecipeInitialData = {
    name: '',
    description: '',
    hours: '',
    minutes: '',
    img: null,
    ingredients: [getNewIngredient()],
    steps: [{ id: getRandomId(), value: '' }],
    tags: [],
  };

  return (
    <NewRecipe
      loading={loading}
      onSubmit={onSubmit}
      initialData={initialData}
      pageTitle='Create a new recipe'
    />
  );
}

export default NewRecipeContainer;
