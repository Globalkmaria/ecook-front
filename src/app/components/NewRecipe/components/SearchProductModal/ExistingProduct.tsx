import { memo } from 'react';

import style from './style.module.scss';

import { Product } from '@/services/products/type';

import { ProductInfo } from '@/app/recipes/[recipeKey]/components/Product';

import Icon from '@/components/Icon';
import CustomImage from '@/components/CustomImage';

import { SelectedProductState } from '.';

interface ExistingProductProps {
  item: Product;
  selectedProduct: SelectedProductState;
  ingredientName: string;
  searchedIngredientId?: string;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<SelectedProductState>
  >;
}

function ExistingProduct({
  item,
  selectedProduct,
  ingredientName,
  searchedIngredientId,
  setSelectedProduct,
}: ExistingProductProps) {
  const onClick = (product: Product) => {
    if (!searchedIngredientId) return;

    if (selectedProduct?.productId === product.id) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: product.ingredientId,
      name: product.name,
      productId: product.id,
      newProduct: null,
    });
  };

  return (
    <li className={style['product-container']} onClick={() => onClick(item)}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={item.id.toString()}
        checked={selectedProduct?.productId === item.id}
        onChange={() => onClick(item)}
      />
      <div className={style.product}>
        <div className={style['img-box']}>
          {item.img ? (
            <CustomImage
              src={item.img}
              alt={item.name}
              fill
              loadingClassName={style['img-placeholder']}
              imgClassName={style['img']}
            />
          ) : (
            <Icon icon='img' className={style['img-icon']} />
          )}
        </div>

        <div className={style['product__info']}>
          <ProductInfo product={item} ingredientName={ingredientName} />
        </div>
      </div>
    </li>
  );
}

export default memo(ExistingProduct);
