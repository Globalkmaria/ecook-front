import { getProductLink } from '@/helpers/links';

import ImgCard from '@/components/ImgCard';

import { Product } from '@/services/requests/products/type';

import style from './style.module.scss';

function OtherProductList({ products }: { products: Product[] }) {
  if (!products?.length) return <NoContent />;

  return (
    <ul className={style['list']}>
      {products.map((item, index) => (
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

function NoContent() {
  return <div>This is the only product with this ingredient!</div>;
}
