import Image from 'next/image';
import { Libre_Bodoni } from 'next/font/google';

import style from './style.module.scss';

import { Modal } from '@/components/Modal';
import { Ingredient, IngredientProduct } from '@/data/ingredients';
import useModal from '@/hooks/useModal';
import { joinClassNames } from '@/utils/style';
import Chip from '@/components/Chip';
import Icon from '@/components/Icon';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

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
        <div className={style['icon-info']}>
          <div className={style['icon-info__item']}>
            <Icon icon='label' />
            <span>Product Name</span>
          </div>
          <div className={style['icon-info__item']}>
            <Icon icon='product' />
            <span>Brand</span>
          </div>
          <div className={style['icon-info__item']}>
            <Icon icon='basket' />
            <span>Purchased at</span>
          </div>
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
          <Icon icon='label' />
          <span>{item.name}</span>
        </div>
        <div className={style['product__info']}>
          <Icon icon='product' />
          <span>{item.brand || ''}</span>
        </div>
        <div className={style['product__info']}>
          <Icon icon='basket' />
          <span>{item.purchasedAt || ''}</span>
        </div>
      </div>
    </div>
  );
}
