'use client';

import { useRouter } from 'next/navigation';

import { useClientStore } from '@/providers/client-store-provider';

import { useCreateRecipe } from '@/queries/hooks';

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
  const { mutate, isPending } = useCreateRecipe();

  const onSubmit = async (data: NewRecipeSubmitProps) => {
    if (!username) {
      router.replace(LOGIN_LINK);
      return;
    }

    if (isPending) return;
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
      loading={isPending}
      onSubmit={onSubmit}
      initialData={initialData}
      pageTitle='Create a new recipe'
    />
  );
}

export default NewRecipeContainer;
