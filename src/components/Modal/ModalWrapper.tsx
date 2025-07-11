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
    if (typeof window === 'undefined') return;

    const targetId = wrapperId || 'modal-root';
    const element = document.getElementById(targetId);

    if (element && element !== containerElement) {
      setContainerElement(element);
    }
  }, [wrapperId, containerElement]);

  if (typeof window === 'undefined' || !containerElement) {
    return null;
  }

  return createPortal(children, containerElement);
}

export default ModalWrapper;
