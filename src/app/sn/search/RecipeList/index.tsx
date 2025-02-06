import style from './style.module.scss';

import { RecipeSimple } from '@/services/recipe/type';

import RecipeImgAndInfoCard from '@/app/components/RecipeImgAndInfoCard';

interface Props {
  recipes: RecipeSimple[];
}

function RecipeList({ recipes }: Props) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeImgAndInfoCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
