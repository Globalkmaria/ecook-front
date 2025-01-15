'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { QUERY_KEY__PROFILE, QUERY_KEY__RECIPE_LIST } from '@/queries';

import { NewRecipeData } from '@/services/recipes/type';
import { createRecipe } from '@/services/recipes';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import { getRandomId } from '@/utils/generateId';

import { Step } from './components/Steps';
import NewRecipe, {
  NewRecipeIngredientStates,
  NewRecipeInitialData,
  NewRecipeTags,
  TextInputs,
} from '../../components/NewRecipe';
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
  const [resetUser, username] = useClientStore(
    useShallow((state) => [state.resetUser, state.username]),
  );
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();
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
    if (isLoading) return;
    if (!img || !ingredients.length || !steps.length) {
      alert('Please fill in all required fields');
      return;
    }

    startTransition(async () => {
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

      const result = await createRecipe(formData);
      handleApiAuthResponse(result, router, resetUser);

      if (result.ok) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY__RECIPE_LIST, username],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY__PROFILE, username],
        });
        router.replace(`/recipes/${result.data.key}`);
        return;
      }

      alert('Failed to submit recipe');
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
      loading={isLoading}
      onSubmit={onSubmit}
      initialData={initialData}
      pageTitle='Create a new recipe'
    />
  );
}

export default NewRecipeContainer;
