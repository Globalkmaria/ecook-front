import { memo } from 'react';

import { joinClassNames } from '@/utils/style';

import { getSearchProductLink } from '@/helpers/links';

import Chip from '@/components/Chip';
import CustomImage from '@/components/CustomImage';
import Icon, { IconProps } from '@/components/Icon';
import SearchIconLink from '@/components/SearchIconLink';

import { Product as ProductType } from '@/services/requests/products/type';
import { RecipeProduct } from '@/services/requests/recipe/type';

import style from './style.module.scss';

interface Props {
  product: RecipeProduct | ProductType;
  isUserProduct?: boolean;
  ingredientName: string;
}

function Product({ product, isUserProduct, ingredientName }: Props) {
  const productClassName = isUserProduct
    ? joinClassNames(style['product--user'], style.product)
    : style.product;

  const img = product.img ? (
    <CustomImage src={product.img} alt={product.name} fill />
  ) : (
    <Icon icon='img' className={style['img-icon']} />
  );

  return (
    <div className={productClassName}>
      {isUserProduct && (
        <div className={style['user-pick']}>
          <Chip border>User pick</Chip>
        </div>
      )}

      <div className={style.search}>
        <SearchIconLink href={getSearchProductLink(product.name)} />
      </div>

      <div className={style['img-box']}>{img}</div>

      <ProductInfoContent ingredientName={ingredientName} product={product} />
    </div>
  );
}

export default Product;

interface ProductInfo {
  name: string;
  brand?: string | null;
  purchasedFrom?: string | null;
}

interface ProductInfoContentProps {
  product: ProductInfo;
  ingredientName: string;
}

type ProductInfoItems = {
  icon: IconProps['icon'];
  value: string | null;
}[];

export const ProductInfoContent = memo(function ProductInfoContent({
  product,
  ingredientName,
}: ProductInfoContentProps) {
  const productInfoItems: ProductInfoItems = [
    { icon: 'labelFill', value: ingredientName },
    { icon: 'label', value: product.name },
    { icon: 'product', value: product.brand || '' },
    { icon: 'basket', value: product.purchasedFrom || '' },
  ];

  return (
    <div className={style['product__content']}>
      {productInfoItems.map((item, index) => (
        <div key={index} className={style['product__info']}>
          <Icon icon={item.icon} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
});
