'use client';

import dynamic from 'next/dynamic';

import style from './style.module.scss';
import SavedRecipeListSkeleton from './SavedRecipeListSkeleton';
import { Suspense } from 'react';

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
