'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { getRecipeLink, LOGIN_LINK } from '@/helpers/links';

import {
  generateProductListQueryKey,
  generateRecipeListQueryKey,
  generateUserProfileQueryKey,
} from '@/queries/helpers';

import { createRecipe } from '@/services/recipes';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import NewRecipe, {
  NewRecipeSubmitProps,
} from '@/app/components/common/NewRecipe';
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

  const onSubmit = async (data: NewRecipeSubmitProps) => {
    if (!username) {
      router.replace(LOGIN_LINK);
      return;
    }

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
        queryKey: generateRecipeListQueryKey({
          query: 'username',
          type: username,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: generateUserProfileQueryKey(username),
      });
      queryClient.invalidateQueries({
        queryKey: generateProductListQueryKey({
          type: 'username',
          query: username,
        }),
      });

      router.replace(getRecipeLink(result.data.key));
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
