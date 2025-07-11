'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  wrapperId?: string;
}

function ModalWrapper({ children, wrapperId }: Props) {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const element =
      (wrapperId && document.getElementById(wrapperId)) ||
      document.getElementById('modal-root');

    if (element) {
      setContainerElement(element);
    }
  }, [wrapperId]);

  if (typeof window === 'undefined' || !containerElement) {
    return null;
  }

  return createPortal(children, containerElement);
}

export default ModalWrapper;
