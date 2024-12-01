import { memo } from 'react';
import style from './style.module.scss';

import Icon from '@/components/Icon';

function IngredientInformationHeader() {
  return (
    <div className={style['icon-info']}>
      <div className={style['icon-info__item']}>
        <Icon icon='labelFill' />
        <span>Ingredient name</span>
      </div>
      <div className={style['icon-info__item']}>
        <Icon icon='label' />
        <span>Product name</span>
      </div>
      <div className={style['icon-info__item']}>
        <Icon icon='product' />
        <span>Brand</span>
      </div>
      <div className={style['icon-info__item']}>
        <Icon icon='basket' />
        <span>Purchased at</span>
      </div>
    </div>
  );
}

export default memo(IngredientInformationHeader);
