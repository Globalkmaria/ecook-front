import style from './Recipes.module.scss';

import { getRecipes } from '@/service/recipes';

import Recipe from './Recipe';

async function Recipes() {
  const recipes = await getRecipes();
  return (
    <section className={style.container}>
      {recipes.data?.map((recipe, idx) => (
        <Recipe key={recipe.id} recipe={recipe} idx={idx} />
      ))}
    </section>
  );
}

export default Recipes;
