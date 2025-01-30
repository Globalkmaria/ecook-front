import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { productsOptions } from '@/queries/productsOptions';

import { UserPageParams } from '../page';
import ProductCards from './ProductCards';
import { useClientStore } from '@/providers/client-store-provider';

function ProductList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const { data, error } = useQuery(
    productsOptions({
      type: 'username',
      q: params.username || '',
      staleTime: 180000, // 3 minutes
      enabled: isUserProfile,
    }),
  );

  if (error) return notFound();

  return <ProductCards products={data ?? []} />;
}

export default ProductList;
