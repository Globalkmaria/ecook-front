import style from './style.module.scss';

import { Product } from '@/services/products/type';

import { getProductLink } from '@/helpers/links';

import ImgCard, { ImgCardProps } from '@/components/ImgCard';

interface Props {
  products: Product[];
}

function ProductCards({ products }: Props) {
  return (
    <ul className={style.list}>
      {products.map((product) => (
        <Card key={product.key} product={product} />
      ))}
    </ul>
  );
}

export default ProductCards;

function Card({ product }: { product: Product }) {
  const imgProps: ImgCardProps['imgProps'] = {
    src: product.img,
    alt: product.name,
  };
  const link = getProductLink(product.key);

  return (
    <li className={style['card']}>
      <ImgCard.Container link={link} imgProps={imgProps}>
        <ImgCard.TopOverlay>
          <span>{product.ingredient.name}</span>
        </ImgCard.TopOverlay>
        <ImgCard.BottomOverlay>
          <span>{product.name}</span>
        </ImgCard.BottomOverlay>
      </ImgCard.Container>
    </li>
  );
}
