import RecipeRecommendList, {
  RecipeRecommendListProps,
  RecipeRecommendListSkeleton,
} from './RecipeRecommendList';
import style from './style.module.scss';

type RecipeRecommendProps = RecipeRecommendListProps;

function RecipeRecommend(prop: RecipeRecommendProps) {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore related recipes</h2>
      <RecipeRecommendList {...prop} />
    </section>
  );
}

export default RecipeRecommend;

export function RecipeRecommendSkeleton() {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore related recipes</h2>
      <RecipeRecommendListSkeleton />
    </section>
  );
}
