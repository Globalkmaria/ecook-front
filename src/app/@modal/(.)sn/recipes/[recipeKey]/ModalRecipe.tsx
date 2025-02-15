import RecipePageContainer from '@/app/sn/recipes/[recipeKey]/RecipePageContainer';
import ModalRecipeWrapper from './ModalRecipeWrapper';

function ModalRecipe({ recipeKey }: { recipeKey: string }) {
  return (
    <ModalRecipeWrapper>
      <RecipePageContainer recipeKey={recipeKey} />
    </ModalRecipeWrapper>
  );
}

export default ModalRecipe;
