import { RecipeDetail } from '@/services/recipe/type';
import Recipe from './Recipe';
import Recommend from './Recommend';
import { RecommendRecipe } from '@/services/recommend/type';

interface Props {
  recipe: RecipeDetail;
}

function RecipePageContainer({ recipe }: Props) {
  const recommend: RecommendRecipe = {
    name: recipe.name,
    key: recipe.key,
    img: recipe.img,
    user: recipe.user,
  };
  const list = Array(20).fill(recommend);
  return (
    <div>
      <Recipe recipe={recipe} />
      <Recommend list={list} />
    </div>
  );
}

export default RecipePageContainer;
