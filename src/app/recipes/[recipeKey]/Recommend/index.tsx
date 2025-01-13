'use client';

import Card from '@/components/Card';
import style from './style.module.scss';
import { RecommendRecipe } from '@/services/recommend/type';

interface Props {
  list: RecommendRecipe[];
}

function Recommend({ list }: Props) {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore more recipes</h2>

      <ul className={style['list']}>
        {list.map((item, index) => (
          <li className={style['item']} key={index}>
            <Card data={item} key={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Recommend;
