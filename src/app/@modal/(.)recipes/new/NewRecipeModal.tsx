'use client';

import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { Modal2 } from '@/components/Modal';
import NewRecipeContainer from '@/app/recipes/new/NewRecipeContainer';

function NewRecipeModal() {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <NewRecipeContainer />
      </div>
    </Modal2>
  );
}

export default NewRecipeModal;