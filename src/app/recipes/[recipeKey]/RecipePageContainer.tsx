import { RecipeDetail } from '@/services/recipe/type';
import Recipe from './Recipe';
import Recommend from './Recommend';
import { RecommendRecipe } from '@/services/recommend/type';

interface Props {
  recipe: RecipeDetail;
  recommendList: RecommendRecipe[];
}

function RecipePageContainer({ recipe, recommendList }: Props) {
  return (
    <div>
      <Recipe recipe={recipe} />
      <Recommend recommendList={recommendList} />
    </div>
  );
}

export default RecipePageContainer;
