'use client';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { Modal2 } from '@/components/Modal';

import RecipePageContainer from '@/app/sn/recipes/[recipeKey]/RecipePageContainer';

function ModalRecipe() {
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

export default ModalRecipe;
