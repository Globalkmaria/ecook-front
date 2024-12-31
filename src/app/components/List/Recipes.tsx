import style from './Recipes.module.scss';

import { getHomeRecipes } from '@/services/recipes';

import Recipe from './Recipe';

async function Recipes() {
  const recipes = await getHomeRecipes();
  if (!recipes.ok) return null;

  return (
    <section className={style.container}>
      {recipes.data?.map((recipe, idx) => (
        <Recipe key={recipe.key} recipe={recipe} idx={idx} />
      ))}
    </section>
  );
}

export default Recipes;
