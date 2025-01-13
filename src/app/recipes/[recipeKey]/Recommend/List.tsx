'use client';

import style from './style.module.scss';

import { RecommendRecipe } from '@/services/recommend/type';

import Card from '@/components/Card';

interface Props {
  recommendList: RecommendRecipe[];
}
function List({ recommendList }: Props) {
  return (
    <ul className={style['list']}>
      {recommendList?.map((item, index) => (
        <li className={style['item']} key={index}>
          <Card data={item} key={index} />
        </li>
      ))}
    </ul>
  );
}

export default List;
