import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { NewRecipeData, RecipeDetail } from '@/service/recipes/type';
import { editRecipe, getRecipe } from '@/service/recipes';

import { getRandomId } from '@/utils/generateId';

import NewRecipe, { NewRecipeInitialData } from '@/app/recipes/new/NewRecipe';
import { OnSubmitNewRecipe } from '@/app/recipes/new/NewRecipeContainer';

type EditRecipeData = Omit<NewRecipeData, 'img'>;

interface Props {
  recipeId: string;
  onCloseModal: () => void;
}

function RecipeEdit({ recipeId, onCloseModal }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  const onSubmit: OnSubmitNewRecipe = async ({
    img,
    ingredients,
    steps,
    textInputs,
    tags,
  }) => {
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

    // TODO remove user id
    const data: EditRecipeData = {
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
      user: { id: '1' },
    };

    formData.append('info', JSON.stringify(data));

    setLoading(true);
    const response = await editRecipe(formData, recipeId);
    setLoading(false);

    if (!response.ok) {
      alert('Failed to submit recipe');
      return;
    }

    router.push(`/recipes/${response.data.id}`);
  };

  const getRecipeData = async () => {
    const result = await getRecipe(recipeId);

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

  const initialData: NewRecipeInitialData = {
    name: recipe.name,
    description: recipe.description,
    hours: recipe.hours === 0 ? '' : recipe.hours.toString(),
    minutes: recipe.minutes === 0 ? '' : recipe.minutes.toString(),
    img: recipe.img,
    ingredients: recipe.ingredients.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      ingredientId: item.ingredientId,
      productId: item.userProduct?.id ?? null,
      newProduct: null,
    })),
    steps: recipe.steps.map((item) => ({ value: item, id: getRandomId() })),
    tags: recipe.tags.map((item) => item.name),
    user: {
      id: recipe.user.id,
    },
  };

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
