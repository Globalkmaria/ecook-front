import { getSearchLink } from '@/helpers/links';

import Anchor from '@/components/Anchor';
import CustomImage from '@/components/CustomImage';
import Icon, { IconProps } from '@/components/Icon';

import { Product } from '@/services/requests/products/type';

import style from './style.module.scss';

interface Props {
  product: Product;
}

function ProductInformation({ product }: Props) {
  const descriptions: {
    [K in ContentValues]: string;
  } = {
    ingredientName: product.ingredient.name,
    brand: `${product.brand}`,
    purchasedFrom: `${product.purchasedFrom}`,
  };

  return (
    <section className={style.container}>
      <h1 className={style['name']}>{product.name}</h1>
      <div className={style['img-box']}>
        <CustomImage
          className={style['img']}
          src={product.img}
          fill
          alt={product.name}
        />
      </div>
      <div className={style['info']}>
        <div className={style['contents']}>
          {CONTENTS.map((content, i) => (
            <div className={style['content']} key={i}>
              <span className={style['content__title']}>
                <Icon icon={content.icon} />
                {content.title}
              </span>
              <span className={style['content__description']}>
                {descriptions[content.value]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={style['links']}>
        <Anchor
          href={getSearchLink('product', product.name)}
        >{`What Can I Make with This Product?`}</Anchor>
        <Anchor
          variant='secondary'
          href={getSearchLink('ingredient', product.ingredient.name)}
        >{`What Can I Make with This Ingredient?`}</Anchor>
      </div>
    </section>
  );
}

export default ProductInformation;

const CONTENT_VALUES = ['ingredientName', 'brand', 'purchasedFrom'] as const;
type ContentValues = (typeof CONTENT_VALUES)[number];

const CONTENTS: {
  icon: IconProps['icon'];
  title: string;
  value: ContentValues;
}[] = [
  {
    value: 'ingredientName',
    title: 'Ingredient name',
    icon: 'labelFill',
  },
  {
    value: 'brand',
    title: 'Brand',
    icon: 'product',
  },

  {
    value: 'purchasedFrom',
    title: 'Purchased from',
    icon: 'basket',
  },
];
