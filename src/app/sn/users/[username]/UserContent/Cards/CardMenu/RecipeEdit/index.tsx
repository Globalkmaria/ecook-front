'use client';

import { mutationKeys } from '@/queries/helpers';
import { useEditRecipeMutation } from '@/queries/hooks';
import { recipeOptions } from '@/queries/options';

import Skeleton from '@/components/Skeleton';

import NewRecipe from '@/app/components/common/NewRecipe';
import { OnSubmitNewRecipe } from '@/app/components/common/NewRecipe';
import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { RecipeDetail } from '@/services/requests/recipe/type';
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
  const Error = () => {
    alert(GET_RECIPE_ERROR_MESSAGE);
    onCloseModal();
    return null;
  };

  return (
    <SuspenseQuery
      fallback={<Loading />}
      errorFallback={Error}
      {...recipeOptions({ key: recipeKey })}
    >
      {(recipe) => (
        <RecipeEditBody
          recipeKey={recipe.key}
          onCloseModal={onCloseModal}
          recipe={recipe}
        />
      )}
    </SuspenseQuery>
  );
}

export default RecipeEdit;

type RecipeEditBodyProps = {
  recipe: RecipeDetail;
} & Props;

function RecipeEditBody({
  recipeKey,
  onCloseModal,
  recipe,
}: RecipeEditBodyProps) {
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

  const initialData = getEditRecipeInitialValues(recipe);

  const mutationKey = mutationKeys.recipes.recipe.update(recipeKey);

  if (!recipe) return <div>Recipe not found</div>;
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

export const Loading = () => (
  <div className={style.loading}>
    <Skeleton />
  </div>
);

// Error messages

const FILL_REQUIRED_FIELDS = 'Please fill in all required fields';
const GET_RECIPE_ERROR_MESSAGE =
  'Something went wrong while getting the recipe.';
