'use client';

import style from './style.module.scss';

import { Modal2 } from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { RecipeDetail } from '@/service/recipes/type';
import Recipe from '@/app/recipes/[recipeKey]/Recipe';

interface Props {
  recipe: RecipeDetail;
}

function ModalRecipes({ recipe }: Props) {
  const router = useRouter();
  const onDismiss = () => router.back();
  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <Recipe recipe={recipe} />
      </div>
    </Modal2>
  );
}

export default ModalRecipes;
