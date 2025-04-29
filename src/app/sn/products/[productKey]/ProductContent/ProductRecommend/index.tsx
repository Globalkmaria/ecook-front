'use client';

import { useParams } from 'next/navigation';

import { productRecommendOptions } from '@/queries/options';

import RecipeRecommend from '@/app/components/common/RecipeRecommend';

import { ProductPageParams } from '../../page';

function ProductRecommend() {
  const { productKey } = useParams<ProductPageParams>();
  return (
    <RecipeRecommend
      queryOptions={productRecommendOptions({ key: productKey })}
    />
  );
}

export default ProductRecommend;
