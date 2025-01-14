'use client';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import RecipePageContainer from '@/app/recipes/[recipeKey]/RecipePageContainer';

import { Modal2 } from '@/components/Modal';

function ModalRecipes() {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <RecipePageContainer />
      </div>
    </Modal2>
  );
}

export default ModalRecipes;
