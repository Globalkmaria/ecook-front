'use client';

import style from './modal.module.scss';

import { MouseEvent, ReactNode, useEffect, useRef } from 'react';

import useEscapeKey from '@/hooks/useEscapeKey';
import useHideScroll from '@/hooks/useHideScroll';
import ModalWrapper from './ModalWrapper';
import Icon from '../Icon';

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
      <div
        className={`${style.container} ${isOpen ? '' : style['container--close']}`}
        onClick={onClick}
        ref={modalBackground}
      >
        <div
          className={style.content}
          id={id}
          ref={modalContent}
          aria-modal='true'
          role='dialog'
          tabIndex={-1}
        >
          <div
            className={`${style.header} ${needHeader ? '' : style['header--no-header']}`}
          >
            <h1 className={style.title}>{title}</h1>
            {showCloseButton && (
              <button type='button' onClick={onClose}>
                <Icon icon='close' />
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Modal;

export function ModalMessage({ children }: { children: ReactNode }) {
  return <p className={style.message}>{children}</p>;
}
