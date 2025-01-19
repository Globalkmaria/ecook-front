import { memo } from 'react';
import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';

function IngredientInformationHeader() {
  return (
    <div className={style['icon-info']}>
      {ITEMS.map((item, index) => (
        <div key={index} className={style['icon-info__item']}>
          <Icon icon={item.icon} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default memo(IngredientInformationHeader);

const ITEMS: {
  icon: IconProps['icon'];
  label: string;
}[] = [
  { icon: 'labelFill', label: 'Ingredient name' },
  { icon: 'label', label: 'Product name' },
  { icon: 'product', label: 'Brand' },
  { icon: 'basket', label: 'Purchased at' },
];
