import style from './style.module.scss';

import { notFound } from 'next/navigation';
import PantryBoxRecipeRecommend from './PantryBoxRecipeRecommend';
import PantryBoxInfo from './PantryBoxInfo';

interface PantryBoxPageContainerProps {
  pantryBoxKey: string;
}

function PantryBoxPageContainer({ pantryBoxKey }: PantryBoxPageContainerProps) {
  if (!pantryBoxKey) notFound();

  return (
    <div className={style['page']}>
      <div className={style['page__container']}>
        <PantryBoxInfo />
        <PantryBoxRecipeRecommend pantryBoxKey={pantryBoxKey} />
      </div>
    </div>
  );
}

export default PantryBoxPageContainer;
