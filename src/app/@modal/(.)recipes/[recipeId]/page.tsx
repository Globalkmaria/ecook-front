'use client';

import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import Recipe from '@/app/recipes/[recipeId]/Recipe';
import { Modal2 } from '@/components/Modal';

interface Props {
  params: { recipeId: string };
}

function RecipePage({ params }: Props) {
  const router = useRouter();

  if (!params.recipeId) {
    return null;
  }

  const onDismiss = () => {
    router.back();
  };
  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <Recipe recipeId={params.recipeId} />
      </div>
    </Modal2>
  );
}

export default RecipePage;
