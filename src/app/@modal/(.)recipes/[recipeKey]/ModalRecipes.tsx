'use client';

import style from './style.module.scss';

import { Modal2 } from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { RecipeDetail } from '@/services/recipe/type';
import RecipePageContainer from '@/app/recipes/[recipeKey]/RecipePageContainer';
import { RecommendRecipe } from '@/services/recommend/type';

interface Props {
  recipe: RecipeDetail;
  recommendList: RecommendRecipe[];
}

function ModalRecipes({ recipe, recommendList }: Props) {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <RecipePageContainer recipe={recipe} recommendList={recommendList} />
      </div>
    </Modal2>
  );
}

export default ModalRecipes;
