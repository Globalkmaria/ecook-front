'use client';

import { useRouter } from 'next/navigation';
import Modal2 from './Modal2';

function PageModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <Modal2 isOpen={true} onClose={onDismiss}>
      {children}
    </Modal2>
  );
}

export default PageModalWrapper;
