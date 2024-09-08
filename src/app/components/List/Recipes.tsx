'use client';

import style from './Recipes.module.scss';
import Recipe from './Recipe';

import { RECIPE_IDS } from '@/data/recipe';

function Recipes() {
  return (
    <section className={style.container}>
      {RECIPE_IDS.map((idx) => (
        <Recipe key={idx} idx={idx} />
      ))}
    </section>
  );
}

export default Recipes;
