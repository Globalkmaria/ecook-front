import { Libre_Bodoni } from 'next/font/google';

import style from './style.module.scss';

import { Modal } from '@/components/Modal';
import useModal from '@/hooks/useModal';
import { joinClassNames } from '@/utils/style';
import Product from '../Product';
import IngredientInformationHeader from './IngredientInformationHeader';
import { Ingredient } from '@/service/recipes/type';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

interface Props {
  ingredient: Ingredient;
  modalControl: ReturnType<typeof useModal>;
}

function IngredientInformationModal({ modalControl, ingredient }: Props) {
  const titleClassName = joinClassNames(
    style['ingredient__name'],
    libre.className,
  );

  if (!ingredient.ingredientId) return null;

  return (
    <Modal onClose={modalControl.onClose} isOpen={modalControl.isOpen}>
      <div className={style.container}>
        <div className={style.ingredient}>
          <span className={titleClassName}>{ingredient.name}</span>
        </div>

        <IngredientInformationHeader />

        <div className={style['product-list']}>
          {ingredient.userProduct ? (
            <Product product={ingredient.userProduct} isUserProduct />
          ) : null}
          {ingredient.products?.map((item, idx) => (
            <Product product={item} key={idx} />
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default IngredientInformationModal;
