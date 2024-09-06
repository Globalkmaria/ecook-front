'use client';

import style from './Recipes.module.scss';
import Recipe from './Recipe';

import { recipeIds } from '@/data/recipe';

function Recipes() {
  return (
    <section className={style.container}>
      {recipeIds.map((idx) => (
        <Recipe key={idx} idx={idx} />
      ))}
    </section>
  );
}

export default Recipes;
