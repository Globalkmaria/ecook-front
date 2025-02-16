'use client';

import style from './style.module.scss';

import { Product } from '@/services/requests/products/type';

import { useClientStore } from '@/providers/client-store-provider';

import { getProductLink } from '@/helpers/links';

import ImgCard, { ImgCardProps } from '@/components/ImgCard';
import IconButton from '@/components/IconButton';

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

  const addProduct = useClientStore((state) => state.addProductToCart);
  const onAddProduct = () => {
    addProduct(product.ingredient.key, product.key);
  };

  return (
    <li className={style['card']}>
      <div className={style['card__top']}>
        <IconButton
          icon='cart'
          onClick={onAddProduct}
          className={style['cart']}
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
