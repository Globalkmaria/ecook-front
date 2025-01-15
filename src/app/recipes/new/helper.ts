import { getRandomId } from '@/utils/generateId';
import { NewRecipeIngredientState } from '../../components/NewRecipe';

export const getNewIngredient = (): NewRecipeIngredientState => ({
  id: getRandomId(),
  name: '',
  quantity: '',
  ingredientId: null,
  productId: null,
  newProduct: null,
});
