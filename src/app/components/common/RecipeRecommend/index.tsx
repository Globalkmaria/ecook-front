import { useParams } from 'next/navigation';

import { productRecommendOptions } from '@/queries/options';

import { CardLoading } from '@/components/Card';

import { ProductPageParams } from '@/app/sn/products/[productKey]/page';

import { SuspenseQuery } from '../SuspenseQuery';
import RecipeRecommendList from './RecipeRecommendList';
import style from './style.module.scss';

function RecipeRecommend() {
  const params = useParams<ProductPageParams>();
  const { productKey } = params;
  return (
    <Container>
      <SuspenseQuery
        fallback={<ListSkeleton />}
        errorFallback={Error}
        {...productRecommendOptions({ key: productKey })}
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
