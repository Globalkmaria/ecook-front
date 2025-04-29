'use client';

import { notFound, useParams } from 'next/navigation';

import { productOptions } from '@/queries/options';

import CopyLinkButton from '@/app/components/common/CopyLinkButton';
import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { Product } from '@/services/requests/products/type';

import AddToCart from './AddToCart';
import style from './style.module.scss';
import { ProductPageParams } from '../page';
import OtherProducts from './OtherProducts';
import ProductInformation, {
  ProductInformationSkeleton,
} from './ProductInformation';
import ProductRecommend from './ProductRecommend';

function ProductContent() {
  const { productKey } = useParams<ProductPageParams>();
  return (
    <SuspenseQuery
      {...productOptions({ key: productKey })}
      fallback={<ProductContentSkeleton />}
    >
      {(product) => <ProductContentBody product={product} />}
    </SuspenseQuery>
  );
}

export default ProductContent;

function ProductContentBody({ product }: { product: Product }) {
  if (!product) return notFound();

  return (
    <div className={style['container']}>
      <div className={style['header']}>
        <CopyLinkButton />
        <AddToCart
          ingredientKey={product.ingredient.key}
          productKey={product.key}
        />
      </div>
      <ProductInformation product={product} />
      <OtherProducts />
      <ProductRecommend />
    </div>
  );
}

function ProductContentSkeleton() {
  return (
    <div className={style['container']}>
      <div className={style['header']}>
        <div className={style['header-skeleton']} />
      </div>
      <ProductInformationSkeleton />
    </div>
  );
}
