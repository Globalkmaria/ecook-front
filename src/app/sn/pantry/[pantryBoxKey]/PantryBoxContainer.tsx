import style from './style.module.scss';

import { notFound } from 'next/navigation';
import PantryBoxContent from './PantryBoxContent';

interface PantryBoxPageContainerProps {
  pantryBoxKey: string;
}

function PantryBoxPageContainer({ pantryBoxKey }: PantryBoxPageContainerProps) {
  if (!pantryBoxKey) notFound();

  return (
    <div className={style['page']}>
      <div className={style['page__container']}>
        <PantryBoxContent />
      </div>
    </div>
  );
}

export default PantryBoxPageContainer;
