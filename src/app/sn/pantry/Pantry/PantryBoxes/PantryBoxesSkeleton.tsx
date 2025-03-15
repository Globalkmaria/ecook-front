import Skeleton from '@/components/Skeleton';

import style from './style.module.scss';

const array = Array.from({ length: 4 }, (_, i) => i + 1);
function PantryBoxesSkeleton() {
  return (
    <ul className={style['pantry-boxes']}>
      {array.map((item) => (
        <li className={style['pantry-box']} key={item}>
          <Skeleton border />
        </li>
      ))}
    </ul>
  );
}

export default PantryBoxesSkeleton;
