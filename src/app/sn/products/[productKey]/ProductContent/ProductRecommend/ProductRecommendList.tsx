import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import Card from '@/components/Card';

import { productRecommendOptions } from '@/queries/options';

import { ProductPageParams } from '../../page';

function ProductRecommendList() {
  const params = useParams<ProductPageParams>();
  const { data, isError } = useQuery(
    productRecommendOptions({ key: params.productKey }),
  );
  if (isError) <Error />;
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

export default ProductRecommendList;

function Error() {
  return <div>Failed to load recommendations. Try again later.</div>;
}
