import { getHomeRecipes } from '@/services/requests/home';

import Recipe from './Recipe';
import style from './style.module.scss';

async function Recent() {
  const recipes = await getHomeRecipes();
  if (!recipes.ok) return null;

  return (
    <section className={style['recent']}>
      <h2 className={style['title']}>Explore more recipes</h2>
      <div className={style.list}>
        {recipes.data?.map((recipe, idx) => (
          <Recipe key={recipe.key} recipe={recipe} idx={idx} />
        ))}
      </div>
    </section>
  );
}

export default Recent;
