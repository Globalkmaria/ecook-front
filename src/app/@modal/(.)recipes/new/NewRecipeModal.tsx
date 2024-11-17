'use client';

import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import NewRecipe from '@/app/recipes/new/NewRecipe';
import { Modal2 } from '@/components/Modal';

function NewRecipeModal() {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <NewRecipe />
      </div>
    </Modal2>
  );
}

export default NewRecipeModal;
