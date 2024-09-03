'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  wrapperId?: string;
}

function ModalWrapper({ children, wrapperId }: Props) {
  const containerElement =
    (wrapperId && document.getElementById(wrapperId)) ||
    document.getElementById('modal-root');

  if (!containerElement)
    throw new Error('ModalWrapper: containerElement is null');

  return createPortal(children, containerElement);
}

export default ModalWrapper;
