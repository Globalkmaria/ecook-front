import { memo } from 'react';

import style from './style.module.scss';

import { Product } from '@/services/requests/products/type';
import { ProductInfoContent } from '@/app/sn/recipes/[recipeKey]/Recipe/IngredientList/IngredientInformation/Product';

import Icon from '@/components/Icon';
import CustomImage from '@/components/CustomImage';

import { SelectedProductState } from '.';

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
  );
}

export default memo(ExistingProduct);
