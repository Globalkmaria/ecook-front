'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import style from './style.module.scss';

import { recipeRecommendOptions } from '@/queries/recipeRecommendOptions';

import Card from '@/components/Card';

import { RecipePageParams } from '../page';

function List() {
  const params = useParams<RecipePageParams>();
  const { data, isError } = useQuery(
    recipeRecommendOptions({ key: params.recipeKey }),
  );
  if (!data || isError) return null;

  return (
    <ul className={style['list']}>
      {data?.map((item, index) => (
        <li className={style['item']} key={index}>
          <Card data={item} key={index} />
        </li>
      ))}
    </ul>
  );
}

export default List;
