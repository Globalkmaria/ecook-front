'use client';

import { MouseEvent, ReactNode, useEffect, useRef } from 'react';

import {
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalTitle,
} from './Modal.style';
import useEscapeKey from '@/hooks/useEscapeKey';
import useHideScroll from '@/hooks/useHideScroll';
import ModalWrapper from './ModalWrapper';

interface Props {
  children: ReactNode;
  wrapperId?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  title?: string;
  id?: string;
}

function Modal({
  children,
  wrapperId,
  isOpen = true,
  onClose = () => {},
  title = '',
  showCloseButton = true,
  id,
}: Props) {
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const needHeader = !!title.length || showCloseButton;
  useEscapeKey({ onClose, target: modalBackground, portalId: wrapperId });
  useHideScroll({ isOpen });

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !modalContent.current?.contains(e.target as Node) &&
      modalBackground.current?.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    modalContent.current && modalContent.current?.focus();
  }, []);

  if (!isOpen) return null;

  return (
    <ModalWrapper wrapperId={wrapperId}>
      <StyledModal isOpen={isOpen} onClick={onClick} ref={modalBackground}>
        <StyledModalContent
          id={id}
          ref={modalContent}
          aria-modal='true'
          role='dialog'
          tabIndex={-1}
        >
          <StyledModalHeader needHeader={needHeader}>
            <StyledModalTitle>{title}</StyledModalTitle>
            {showCloseButton && <button onClick={onClose}>X</button>}
          </StyledModalHeader>
          {children}
        </StyledModalContent>
      </StyledModal>
    </ModalWrapper>
  );
}

export default Modal;
