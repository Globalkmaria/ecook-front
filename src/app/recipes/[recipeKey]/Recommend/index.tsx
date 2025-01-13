import style from './style.module.scss';

import { RecommendRecipe } from '@/services/recommend/type';

import List from './List';

interface Props {
  recommendList: RecommendRecipe[];
}

function Recommend({ recommendList }: Props) {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore more recipes</h2>
      <List recommendList={recommendList} />
    </section>
  );
}

export default Recommend;
