import { notFound } from 'next/navigation';

import PantryBoxInfo from './PantryBoxInfo';
import PantryBoxRecipeRecommend from './PantryBoxRecipeRecommend';
import style from './style.module.scss';

interface PantryBoxPageContainerProps {
  pantryBoxKey: string;
}

function PantryBoxPageContainer({ pantryBoxKey }: PantryBoxPageContainerProps) {
  if (!pantryBoxKey) notFound();

  return (
    <div className={style['page']}>
      <div className={style['page__container']}>
        <PantryBoxInfo />
        <PantryBoxRecipeRecommend />
      </div>
    </div>
  );
}

export default PantryBoxPageContainer;
