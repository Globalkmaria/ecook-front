import style from './style.module.scss';

import { joinClassNames } from '@/utils/style';

import Chip from '@/components/Chip';
import Icon from '@/components/Icon';
import { Product as ProductType } from '@/service/products/type';
import { RecipeProduct } from '@/service/recipes/type';
import SearchIconLink from '@/components/SearchIconLink';
import { lightSlugify } from '@/utils/normalize';
import CustomImage from '@/app/components/CustomImage';

interface Props {
  product: RecipeProduct | ProductType;
  isUserProduct?: boolean;
  ingredientName: string;
}

function Product({ product, isUserProduct, ingredientName }: Props) {
  const productClassName = isUserProduct
    ? joinClassNames(style['product--user'], style.product)
    : style.product;

  return (
    <div className={productClassName}>
      {isUserProduct && (
        <div className={style['user-pick']}>
          <Chip border>User pick</Chip>
        </div>
      )}

      <div className={style.search}>
        <SearchIconLink
          href={`/search?type=product&q=${lightSlugify(product.name)}`}
        />
      </div>

      <div className={style['img-box']}>
        {product.img ? (
          <CustomImage src={product.img} alt={product.name} fill />
        ) : (
          <Icon icon='img' className={style['img-icon']} />
        )}
      </div>

      <ProductInfo ingredientName={ingredientName} product={product} />
    </div>
  );
}

export default Product;

interface ProductInfo {
  name: string;
  brand?: string | null;
  purchasedFrom?: string | null;
}

interface ProductInfoProps {
  product: ProductInfo;
  ingredientName: string;
}

export function ProductInfo({ product, ingredientName }: ProductInfoProps) {
  return (
    <div className={style['product__content']}>
      <div className={style['product__info']}>
        <Icon icon='labelFill' />
        <span>{ingredientName}</span>
      </div>
      <div className={style['product__info']}>
        <Icon icon='label' />
        <span>{product.name}</span>
      </div>
      <div className={style['product__info']}>
        <Icon icon='product' />
        <span>{product.brand || ''}</span>
      </div>
      <div className={style['product__info']}>
        <Icon icon='basket' />
        <span>{product.purchasedFrom || ''}</span>
      </div>
    </div>
  );
}
