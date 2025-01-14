import style from './style.module.scss';

import { Ingredient } from '@/services/recipe/type';

import { Modal } from '@/components/Modal';
import useModal from '@/hooks/useModal';

import Product from '../Product';
import IngredientInformationHeader from './IngredientInformationHeader';

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
