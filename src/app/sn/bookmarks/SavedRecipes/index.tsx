'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import SavedRecipeListSkeleton from './SavedRecipeListSkeleton';
import style from './style.module.scss';

const SavedRecipeList = dynamic(() => import('./SavedRecipeList'), {
  ssr: false,
  loading: SavedRecipeListSkeleton,
});

function SavedRecipes() {
  return (
    <section>
      <h2 className={style['title']}>Saved Recipes</h2>
      <Suspense fallback={<SavedRecipeListSkeleton />}>
        <SavedRecipeList />
      </Suspense>
    </section>
  );
}

export default SavedRecipes;
