import { PageModalWrapper } from '@/components/Modal';

import RecipePageContainer from '@/app/sn/recipes/[recipeKey]/RecipePageContainer';

import style from './style.module.scss';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;

  return (
    <PageModalWrapper>
      <div className={style['container']}>
        <RecipePageContainer recipeKey={recipeKey} />
      </div>
    </PageModalWrapper>
  );
}

export default RecipePage;
