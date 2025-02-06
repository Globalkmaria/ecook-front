'use client';

import style from './style.module.scss';

import { RecipeSimple } from '@/services/recipe/type';

import RecipeImgAndInfoCard from '@/app/components/RecipeImgAndInfoCard';

import { getCountText } from './helper';

const recipes = {
  count: 0,
  recipes: [],
};

function SavedRecipes() {
  const countText = getCountText(recipes.count);

  return (
    <section>
      <div className={style['header']}>
        <h2 className={style['title']}>Saved Recipes</h2>
        <span className={style['count']}>{countText}</span>
      </div>
      <div>
        <List recipes={recipes.recipes} />
      </div>
    </section>
  );
}

export default SavedRecipes;

function List({ recipes }: { recipes: RecipeSimple[] }) {
  if (!recipes.length) return null;
  return (
    <ul className={style['list']}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeImgAndInfoCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
