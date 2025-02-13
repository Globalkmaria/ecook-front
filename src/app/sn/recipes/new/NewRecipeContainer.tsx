'use client';

import { useRouter } from 'next/navigation';

import { useClientStore } from '@/providers/client-store-provider';

import { useCreateRecipe } from '@/queries/hooks';
import { mutationKeys } from '@/queries/helpers';

import { LOGIN_LINK } from '@/helpers/links';

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
  const username = useClientStore((state) => state.user.username);
  const { mutate, isPending, isSuccess } = useCreateRecipe();

  const mutationKey = mutationKeys.recipes.create();
  const onSubmit = async (data: NewRecipeSubmitProps) => {
    if (isPending || isSuccess) return;
    if (!username) {
      router.replace(LOGIN_LINK);
      return;
    }

    if (!validateNewRecipeData(data)) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = getNewRecipeSubmitFormData(data);
    mutate(formData);
  };

  const initialData = getNewRecipeInitialData();

  return (
    <NewRecipe
      mutationKey={mutationKey}
      onSubmit={onSubmit}
      initialData={initialData}
      pageTitle='Create a new recipe'
    />
  );
}

export default NewRecipeContainer;
