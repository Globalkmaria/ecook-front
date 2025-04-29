import { getProductLink } from '@/helpers/links';

import ImgCard, { ImgCardProps } from '@/components/ImgCard';

import { Product } from '@/services/requests/products/type';

import AddProductToCart from './AddProductToCart';
import style from './style.module.scss';

export interface ProductCardsProps {
  products: Product[];
}

function ProductCards({ products }: ProductCardsProps) {
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
      <div className={style['card__top']}>
        <AddProductToCart
          ingredientKey={product.ingredient.key}
          productKey={product.key}
        />
      </div>
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

export function ProductCardsSkeleton() {
  return (
    <ul className={style.list}>
      {Array.from({ length: 5 }, (_, i) => (
        <li key={i} className={style['card']}>
          <ImgCard.Skeleton />
        </li>
      ))}
    </ul>
  );
}
