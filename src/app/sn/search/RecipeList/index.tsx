import RecipeImgAndInfoCard from '@/app/components/common/RecipeImgAndInfoCard';

import { RecipeSimple } from '@/services/requests/recipe/type';

import style from './style.module.scss';

interface Props {
  recipes: RecipeSimple[];
}

function RecipeList({ recipes }: Props) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeImgAndInfoCard.Card recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
