import style from './style.module.scss';

import { Product } from '@/services/requests/products/type';

import { getProductLink } from '@/helpers/links';

import ImgCard, { ImgCardProps } from '@/components/ImgCard';

import AddProductToCart from './AddProductToCart';

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
