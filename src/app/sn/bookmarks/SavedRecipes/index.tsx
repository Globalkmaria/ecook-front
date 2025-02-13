'use client';

import dynamic from 'next/dynamic';

import style from './style.module.scss';

const SavedRecipeList = dynamic(() => import('./SavedRecipeList'), {
  ssr: false,
});

function SavedRecipes() {
  return (
    <section>
      <h2 className={style['title']}>Saved Recipes</h2>
      <SavedRecipeList />
    </section>
  );
}

export default SavedRecipes;
