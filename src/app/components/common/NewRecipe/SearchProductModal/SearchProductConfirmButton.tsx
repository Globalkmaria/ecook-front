import style from './style.module.scss';

import { IngredientNewProduct } from '@/services/requests/recipes/type';

import Button from '@/components/Button';

import { OnSelectProduct } from '../RecipeIngredients/RecipeIngredientsContent';
import {
  getIngredientWithExistingProduct,
  getIngredientWithNewProduct,
} from './helper';
import {
  NEW_PRODUCT_ID,
  SearchedIngredientState,
  SelectedProductState,
} from '.';

interface Props {
  selectedProduct: SelectedProductState;
  onSelectProduct: OnSelectProduct;
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
    } else {
      // existing product

      onSelectProduct(
        getIngredientWithExistingProduct({
          selectedProduct,
        }),
      );
      onClose();
    }
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
