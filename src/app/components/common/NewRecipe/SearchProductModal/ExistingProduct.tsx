import { memo } from 'react';

import CustomImage from '@/components/CustomImage';
import Icon from '@/components/Icon';

import { ProductInfoContent } from '@/app/sn/recipes/[recipeKey]/Recipe/IngredientList/IngredientInformation/Product';

import { Product } from '@/services/requests/products/type';

import { SelectedProductState } from '.';
import style from './style.module.scss';

interface ExistingProductProps {
  product: Product;
  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<SelectedProductState>
  >;
}

function ExistingProduct({
  product,
  selectedProduct,
  setSelectedProduct,
}: ExistingProductProps) {
  const onClick = () => {
    if (selectedProduct?.productId === product.id) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: product.ingredient.id,
      ingredientName: product.ingredient.name,
      productId: product.id,
      newProduct: null,
    });
  };

  const id = product.id.toString();
  const checked = selectedProduct?.productId === product.id;
  const img = product.img ? (
    <CustomImage
      src={product.img}
      alt={product.name}
      fill
      loadingClassName={style['img-placeholder']}
      imgClassName={style['img']}
    />
  ) : (
    <Icon icon='img' className={style['img-icon']} />
  );

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions */}
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
            <ProductInfoContent
              product={product}
              ingredientName={product.ingredient.name}
            />
          </div>
        </div>
      </li>
    </>
  );
}

export default memo(ExistingProduct);
