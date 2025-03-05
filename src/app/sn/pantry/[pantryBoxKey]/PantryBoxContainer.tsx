import style from './style.module.scss';

import { notFound } from 'next/navigation';
import PantryBoxContent from './PantryBoxContent';
import PantryBoxRecipeRecommend from './PantryBoxRecipeRecommend';

interface PantryBoxPageContainerProps {
  pantryBoxKey: string;
}

function PantryBoxPageContainer({ pantryBoxKey }: PantryBoxPageContainerProps) {
  if (!pantryBoxKey) notFound();

  return (
    <div className={style['page']}>
      <div className={style['page__container']}>
        <PantryBoxContent />
        <PantryBoxRecipeRecommend />
      </div>
    </div>
  );
}

export default PantryBoxPageContainer;
