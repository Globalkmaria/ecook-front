import { UseSuspenseQueryOptions } from '@tanstack/react-query';

import { CardLoading, CardProps } from '@/components/Card';

import { SuspenseQuery } from '../SuspenseQuery';
import RecipeRecommendList from './RecipeRecommendList';
import style from './style.module.scss';

function RecipeRecommend({
  queryOptions,
}: {
  queryOptions: UseSuspenseQueryOptions<CardProps['data'][]>;
}) {
  return (
    <Container>
      <SuspenseQuery
        fallback={<ListSkeleton />}
        errorFallback={Error}
        {...queryOptions}
      >
        {(data) => <RecipeRecommendList data={data} />}
      </SuspenseQuery>
    </Container>
  );
}

export default RecipeRecommend;

export function RecipeRecommendSkeleton() {
  return (
    <Container>
      <ListSkeleton />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore related recipes</h2>
      {children}
    </section>
  );
}

function Error() {
  return <div>Failed to load recommendations. Try again later.</div>;
}

const array = Array.from({ length: 8 }, (_, i) => i);
function ListSkeleton() {
  return (
    <ul className={style['list']}>
      {array.map((_, index) => (
        <CardLoading key={index} />
      ))}
    </ul>
  );
}
