'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { RecipeRecommendSkeleton } from '@/app/components/common/RecipeRecommend';

import PantryBoxContentSkeleton from './PantryBoxInfo/PantryBoxContent/PantryBoxContentSkeleton';
const PantryBoxInfo = dynamic(() => import('./PantryBoxInfo'), {
  ssr: false,
  loading: PantryBoxContentSkeleton,
});
const PantryBoxRecipeRecommend = dynamic(
  () => import('./PantryBoxRecipeRecommend'),
  { ssr: false, loading: RecipeRecommendSkeleton },
);
import style from './style.module.scss';

interface PantryBoxPageContainerProps {
  pantryBoxKey: string;
}

function PantryBoxPageContainer({ pantryBoxKey }: PantryBoxPageContainerProps) {
  if (!pantryBoxKey) notFound();

  return (
    <div className={style['page']}>
      <div className={style['page__container']}>
        <Suspense fallback={<PantryBoxContentSkeleton />}>
          <PantryBoxInfo />
        </Suspense>
        <Suspense fallback={<RecipeRecommendSkeleton />}>
          <PantryBoxRecipeRecommend />
        </Suspense>
      </div>
    </div>
  );
}

export default PantryBoxPageContainer;
