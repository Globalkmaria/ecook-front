'use client';

import { useQuery } from '@tanstack/react-query';

import { mutationKeys } from '@/queries/helpers';
import { useEditRecipeMutation } from '@/queries/hooks';
import { recipeOptions } from '@/queries/options';

import Skeleton from '@/components/Skeleton';

import NewRecipe from '@/app/components/common/NewRecipe';
import { OnSubmitNewRecipe } from '@/app/components/common/NewRecipe';

import { NewRecipeDataServer } from '@/services/requests/recipes/type';

import {
  getEditRecipeFormData,
  getEditRecipeInitialValues,
  checkRequiredFieldsFilled,
} from './helper';
import style from './style.module.scss';

export type EditRecipeData = Omit<NewRecipeDataServer, 'img'>;

interface Props {
  recipeKey: string;
  onCloseModal: () => void;
}

function RecipeEdit({ recipeKey, onCloseModal }: Props) {
  const {
    data: recipe,
    isLoading: isLoadingRecipe,
    error: recipeError,
  } = useQuery(recipeOptions({ key: recipeKey }));

  const { mutate, isPending: isPendingEditRecipe } = useEditRecipeMutation(
    recipeKey,
    onCloseModal,
  );

  const onSubmit: OnSubmitNewRecipe = (data) => {
    if (isPendingEditRecipe) return;
    if (!checkRequiredFieldsFilled(data)) {
      alert(FILL_REQUIRED_FIELDS);
      return;
    }

    const formData = getEditRecipeFormData(data);
    mutate({ data: formData });
  };

  if (isLoadingRecipe) return <Loading />;

  if (recipeError) {
    alert(GET_RECIPE_ERROR_MESSAGE);
    onCloseModal();
    return null;
  }

  if (!recipe) return <div>Recipe not found</div>;

  const initialData = getEditRecipeInitialValues(recipe);

  const mutationKey = mutationKeys.recipes.recipe.update(recipeKey);
  return (
    <div className={style.container}>
      <NewRecipe
        mutationKey={mutationKey}
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
