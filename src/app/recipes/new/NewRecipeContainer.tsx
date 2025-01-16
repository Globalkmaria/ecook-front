'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { QUERY_KEY__PROFILE, QUERY_KEY__RECIPE_LIST } from '@/queries';

import { createRecipe } from '@/services/recipes';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import NewRecipe, { NewRecipeSubmitProps } from '@/app/components/NewRecipe';
import {
  getNewRecipeInitialData,
  getNewRecipeSubmitFormData,
  validateNewRecipeData,
} from './helper';

function NewRecipeContainer() {
  const router = useRouter();
  const [resetUser, username] = useClientStore(
    useShallow((state) => [state.resetUser, state.user.username]),
  );
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();

  if (!username) {
    router.replace('/login');
    return;
  }

  const onSubmit = async (data: NewRecipeSubmitProps) => {
    if (isLoading) return;
    if (!validateNewRecipeData(data)) {
      alert('Please fill in all required fields');
      return;
    }

    startTransition(async () => {
      const formData = getNewRecipeSubmitFormData(data);
      const result = await createRecipe(formData);
      handleApiAuthResponse(result, router, resetUser);

      if (!result.ok) {
        alert('Failed to submit recipe');
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__RECIPE_LIST, username],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__PROFILE, username],
      });
      router.replace(`/recipes/${result.data.key}`);
    });
  };

  const initialData = getNewRecipeInitialData();

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
