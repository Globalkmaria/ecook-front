'use client';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { Modal2 } from '@/components/Modal';

import ProductPageContainer from '@/app/sn/products/[productKey]/ProductPageContainer';

function ModalProduct() {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>
        <ProductPageContainer />
      </div>
    </Modal2>
  );
}

export default ModalProduct;
