'use client';

import Card, { CardLoading, CardProps } from '@/components/Card';

import style from './style.module.scss';

export interface RecipeRecommendListProps {
  data?: CardProps['data'][];
  isError?: boolean;
  isLoading?: boolean;
}

function RecipeRecommendList({
  data,
  isError,
  isLoading,
}: RecipeRecommendListProps) {
  if (isError) return <Error />;
  if (!isLoading && !data) return null;
  if (isLoading) return <RecipeRecommendListSkeleton />;

  return <Cards data={data || []} />;
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
function Error() {
  return <div>Failed to load recommendations. Try again later.</div>;
}

const array = Array.from({ length: 8 }, (_, i) => i);
export function RecipeRecommendListSkeleton() {
  return (
    <ul className={style['list']}>
      {array.map((_, index) => (
        <CardLoading key={index} />
      ))}
    </ul>
  );
}
