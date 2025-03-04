import style from './style.module.scss';

import { ProductPageParams } from '@/app/sn/products/[productKey]/page';
import ProductPageContainer from '@/app/sn/products/[productKey]/ProductPageContainer';

import { PageModalWrapper } from '@/components/Modal';

interface Props {
  params: Promise<ProductPageParams>;
}

async function ProductPage({ params }: Props) {
  const { productKey } = await params;

  return (
    <PageModalWrapper>
      <div className={style.container}>
        <ProductPageContainer productKey={productKey} />
      </div>
    </PageModalWrapper>
  );
}

export default ProductPage;
