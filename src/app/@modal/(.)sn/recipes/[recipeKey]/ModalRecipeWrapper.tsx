'use client';

import { useRouter } from 'next/navigation';
import style from './style.module.scss';
import { Modal2 } from '@/components/Modal';

function ModalRecipeWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onDismiss = () => router.back();
  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      <div className={style.container}>{children}</div>
    </Modal2>
  );
}

export default ModalRecipeWrapper;
