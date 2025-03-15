import Skeleton from '@/components/Skeleton';

import style from './style.module.scss';

function PantryBoxContentSkeleton() {
  return (
    <section className={style['pantry-box']}>
      <div className={style['pantry-box__title-skeleton']}>
        <Skeleton border />
      </div>
      <div className={style['pantry-box__img']}>
        <Skeleton border />
      </div>
      <div className={style['pantry-box__info']}>
        <div className={style['box']}>
          <div className={style['box__title']}>Total Quantity</div>
          <div className={style['box__description-skeleton']}>
            <Skeleton border />
          </div>
        </div>

        <div className={style['box']}>
          <div className={style['box__title']}>Product Brand</div>
          <div className={style['box__description-skeleton']}>
            <Skeleton border />
          </div>
        </div>
        <div className={style['box']}>
          <div className={style['box__title']}>Purchased From</div>
          <div className={style['box__description-skeleton']}>
            <Skeleton border />
          </div>
        </div>
      </div>
      <div className={style['pantry-box-items']}>
        <div className={style['add-button-skeleton']}>
          <Skeleton border />
        </div>
        <ul className={style['items']}>
          <li className={style['item-skeleton']}>
            <Skeleton border />
          </li>
          <li className={style['item-skeleton']}>
            <Skeleton border />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default PantryBoxContentSkeleton;
