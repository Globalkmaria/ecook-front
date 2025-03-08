'use client';

import { useRouter } from 'next/navigation';

import { Modal2 } from '@/components/Modal';

import NewRecipeContainer from '@/app/sn/recipes/new/NewRecipeContainer';

import style from './style.module.scss';

function NewRecipeModal() {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss} closeOnOutSideClick={false}>
      <div className={style.container}>
        <NewRecipeContainer />
      </div>
    </Modal2>
  );
}

export default NewRecipeModal;
