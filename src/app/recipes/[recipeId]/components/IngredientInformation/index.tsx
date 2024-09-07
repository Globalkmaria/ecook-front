import Image from 'next/image';

import style from './style.module.scss';

import { Modal } from '@/components/Modal';
import { Ingredient, IngredientProduct } from '@/data/ingredients';
import useModal from '@/hooks/useModal';
import { joinClassNames } from '@/utils/style';
import Chip from '@/components/Chip';

interface Props {
  userProduct: IngredientProduct;
  ingredientInfo: Ingredient;
  modalControl: ReturnType<typeof useModal>;
}

function IngredientInformationModal({
  modalControl,
  userProduct,
  ingredientInfo,
}: Props) {
  return (
    <Modal onClose={modalControl.onClose} isOpen={modalControl.isOpen}>
      <div className={style.container}>
        <div className={style.ingredient}>
          <span className={style['ingredient__name']}>
            {ingredientInfo.name}
          </span>
        </div>
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

function Product({
  item,
  isUserProduct,
}: {
  item: IngredientProduct;
  isUserProduct?: boolean;
}) {
  const img = item.img || '/ingredient/default.png';

  const productClassName = isUserProduct
    ? joinClassNames(style['product--user'], style.product)
    : style.product;
  return (
    <div className={productClassName}>
      {isUserProduct && (
        <div className={style['user-pick']}>
          <Chip>User pick</Chip>
        </div>
      )}

      <div className={style['img-box']}>
        <Image src={img} alt={item.name} fill />
      </div>
      <div className={style['product__content']}>
        <div className={style['product__info']}>
          <span className={style['product__info__title']}>Product Name</span>
          <span className={style['product__info__content']}>{item.name}</span>
        </div>
        <div>
          <span className={style['product__info__title']}>Brand</span>
          <span className={style['product__info__content']}>
            {item.brand || ''}
          </span>
        </div>
        <div>
          <span className={style['product__info__title']}>Purchased at</span>
          <span className={style['product__info__content']}>
            {item.purchasedAt || ''}
          </span>
        </div>
      </div>
    </div>
  );
}
