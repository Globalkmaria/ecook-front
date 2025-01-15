import { memo } from 'react';

import style from './style.module.scss';

import { Product } from '@/services/products/type';

import { ProductInfoContent } from '@/app/recipes/[recipeKey]/components/Product';

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
  const onClick = () => {
    if (!searchedIngredientId) return;

    if (selectedProduct?.productId === item.id) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: item.ingredientId,
      name: item.name,
      productId: item.id,
      newProduct: null,
    });
  };

  const id = item.id.toString();
  const checked = selectedProduct?.productId === item.id;
  const img = item.img ? (
    <CustomImage
      src={item.img}
      alt={item.name}
      fill
      loadingClassName={style['img-placeholder']}
      imgClassName={style['img']}
    />
  ) : (
    <Icon icon='img' className={style['img-icon']} />
  );

  return (
    <li className={style['product-container']} onClick={onClick}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onClick}
      />
      <div className={style.product}>
        <div className={style['img-box']}>{img}</div>

        <div className={style['product__info']}>
          <ProductInfoContent product={item} ingredientName={ingredientName} />
        </div>
      </div>
    </li>
  );
}

export default memo(ExistingProduct);
