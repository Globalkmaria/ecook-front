import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { productRecommendOptions } from '@/queries/options';

import RecipeRecommend from '@/app/components/common/RecipeRecommend';

import { ProductPageParams } from '../../page';

function ProductRecommend() {
  const params = useParams<ProductPageParams>();
  const result = useQuery(productRecommendOptions({ key: params.productKey }));

  return <RecipeRecommend {...result} />;
}

export default ProductRecommend;
