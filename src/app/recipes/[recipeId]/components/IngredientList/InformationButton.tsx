import style from './style.module.scss';

import useModal from '@/hooks/useModal';
import { IngredientProduct, INGREDIENTS, PRODUCTS } from '@/data/ingredients';

import IngredientInformationModal from '../IngredientInformation';

interface Props {
  ingredientProductId: IngredientProduct['id'];
}

function InformationButton({ ingredientProductId }: Props) {
  const control = useModal();

  const userProduct = PRODUCTS[ingredientProductId];
  const ingredientInfo = INGREDIENTS[userProduct.ingredientId];
  return (
    <>
      <button className={style.icon} onClick={control.onOpen}>
        i
      </button>
      <IngredientInformationModal
        userProduct={userProduct}
        ingredientInfo={ingredientInfo}
        modalControl={control}
      />
    </>
  );
}

export default InformationButton;
