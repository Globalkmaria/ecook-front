import style from './style.module.scss';

import { IngredientNewProduct } from '@/services/recipes/type';

import Button from '@/components/Button';

import {
  NEW_PRODUCT_ID,
  SearchedIngredientState,
  SelectedProductState,
} from '.';
import { OnSelectProductProps } from '../RecipeIngredientsContent';
import {
  getIngredientWithExistingProduct,
  getIngredientWithNewProduct,
} from './helper';

interface Props {
  selectedProduct: SelectedProductState;
  onSelectProduct: OnSelectProductProps;
  searchedIngredient: SearchedIngredientState;
  newProduct: IngredientNewProduct;
  onClose: () => void;
}

function SearchProductConfirmButton({
  selectedProduct,
  onSelectProduct,
  searchedIngredient,
  newProduct,
  onClose,
}: Props) {
  const handleConfirm = () => {
    if (!selectedProduct) {
      onSelectProduct({
        product: null,
        ingredient: null,
      });

      onClose();
      return;
    }

    if (selectedProduct.productId === NEW_PRODUCT_ID) {
      if (!newProduct.name) {
        alert('Please enter product name to create new product.');
        return;
      }

      onSelectProduct(
        getIngredientWithNewProduct({
          selectedProduct,
          searchedIngredient,
          newProduct,
        }),
      );
      onClose();
      return;
    }

    onSelectProduct(
      getIngredientWithExistingProduct({ selectedProduct, searchedIngredient }),
    );
    onClose();
  };

  const confirmButtonTitle = selectedProduct
    ? 'Product selected'
    : 'Continue without a product';

  return (
    <Button
      variant={selectedProduct ? 'success' : 'primary'}
      className={style['confirm-button']}
      onClick={handleConfirm}
    >
      {confirmButtonTitle}
    </Button>
  );
}

export default SearchProductConfirmButton;
