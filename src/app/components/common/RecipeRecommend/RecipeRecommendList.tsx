'use client';

import Card, { CardProps } from '@/components/Card';

import style from './style.module.scss';

export interface RecipeRecommendListProps {
  data?: CardProps['data'][];
}

function RecipeRecommendList({ data = [] }: RecipeRecommendListProps) {
  if (!data?.length) return null;

  return <Cards data={data} />;
}

export default RecipeRecommendList;

function Cards({ data }: { data: CardProps['data'][] }) {
  return (
    <ul className={style['list']}>
      {data.map((item, index) => (
        <li className={style['item']} key={index}>
          <Card data={item} key={index} />
        </li>
      ))}
    </ul>
  );
}
