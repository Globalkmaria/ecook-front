import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { PRODUCT_TYPES } from '@/services/products';

import { productsOptions } from '@/queries/productsOptions';

import { getProductLink } from '@/helpers/links';

import ImgCard from '@/components/ImgCard';

import { ProductPageParams } from '../../page';

function OtherProductList() {
  const params = useParams<ProductPageParams>();

  const { data, isError } = useQuery(
    productsOptions({ q: params.productKey, type: PRODUCT_TYPES.PRODUCT_KEY }),
  );

  if (isError) <Error />;
  if (!data?.length) return <NoContent />;

  return (
    <ul className={style['list']}>
      {data.map((item, index) => (
        <li className={style['item']} key={index}>
          <ImgCard.Container
            imgProps={{ src: item.img, alt: item.name }}
            link={getProductLink(item.key)}
          >
            <ImgCard.TopOverlay>{item.ingredient.name}</ImgCard.TopOverlay>
            <ImgCard.BottomOverlay>
              <span>{item.name}</span>
            </ImgCard.BottomOverlay>
          </ImgCard.Container>
        </li>
      ))}
    </ul>
  );
}

export default OtherProductList;

function Error() {
  return <div>Failed to load other products. Try again later.</div>;
}

function NoContent() {
  return <div>This is the only product with this ingredient!</div>;
}
