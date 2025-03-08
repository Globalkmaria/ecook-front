import useModal from '@/hooks/useModal';

import { Modal } from '@/components/Modal';

import { Ingredient } from '@/services/requests/recipe/type';

import IngredientInformationHeader from './IngredientInformationHeader';
import Product from './Product';
import style from './style.module.scss';

interface Props {
  ingredient: Ingredient;
  modalControl: ReturnType<typeof useModal>;
}

function IngredientInformationModal({ modalControl, ingredient }: Props) {
  if (!ingredient.ingredientId) return null;

  return (
    <Modal onClose={modalControl.onClose} isOpen={modalControl.isOpen}>
      <div className={style.container}>
        <div className={style.ingredient}>
          <span className={style['ingredient__name']}>{ingredient.name}</span>
        </div>

        <IngredientInformationHeader />

        <div className={style['product-list']}>
          {ingredient.userProduct ? (
            <Product
              product={ingredient.userProduct}
              isUserProduct
              ingredientName={ingredient.name}
            />
          ) : null}
          {ingredient.products?.map((item, idx) => (
            <Product
              product={item}
              key={idx}
              ingredientName={ingredient.name}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default IngredientInformationModal;
