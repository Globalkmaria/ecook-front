import { Libre_Bodoni } from 'next/font/google';

import style from './style.module.scss';

import { Modal } from '@/components/Modal';
import { ServerIngredient, IngredientProduct } from '@/data/ingredients';
import useModal from '@/hooks/useModal';
import { joinClassNames } from '@/utils/style';
import Product from '../Product';
import IngredientInformationHeader from './IngredientInformationHeader';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

interface Props {
  userProduct: IngredientProduct;
  ingredientInfo: ServerIngredient;
  modalControl: ReturnType<typeof useModal>;
}

function IngredientInformationModal({
  modalControl,
  userProduct,
  ingredientInfo,
}: Props) {
  const titleClassName = joinClassNames(
    style['ingredient__name'],
    libre.className,
  );
  return (
    <Modal onClose={modalControl.onClose} isOpen={modalControl.isOpen}>
      <div className={style.container}>
        <div className={style.ingredient}>
          <span className={titleClassName}>{ingredientInfo.name}</span>
        </div>

        <IngredientInformationHeader />

        <div className={style['product-list']}>
          <Product item={userProduct} isUserProduct />
          {ingredientInfo.products.map((item, idx) => (
            <Product item={item} key={idx} />
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default IngredientInformationModal;
