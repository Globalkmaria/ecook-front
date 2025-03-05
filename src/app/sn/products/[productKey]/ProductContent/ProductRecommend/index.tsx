import { ProductPageParams } from '../../page';
import { useQuery } from '@tanstack/react-query';
import { productRecommendOptions } from '@/queries/options';
import { useParams } from 'next/navigation';
import RecipeRecommend from '@/app/components/common/RecipeRecommend';

function ProductRecommend() {
  const params = useParams<ProductPageParams>();
  const { data, isError } = useQuery(
    productRecommendOptions({ key: params.productKey }),
  );

  return <RecipeRecommend data={data} isError={isError} />;
}

export default ProductRecommend;
