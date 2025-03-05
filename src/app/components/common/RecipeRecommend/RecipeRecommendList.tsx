'use client';

import style from './style.module.scss';

import Card, { CardProps } from '@/components/Card';

export interface RecipeRecommendListProps {
  data?: CardProps['data'][];
  isError?: boolean;
}

function RecipeRecommendList({ data, isError }: RecipeRecommendListProps) {
  if (isError) return <Error />;
  if (!data) return null;

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

export default RecipeRecommendList;

function Error() {
  return <div>Failed to load recommendations. Try again later.</div>;
}
