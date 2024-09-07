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
  title?: string;
  id?: string;
}

function Modal2({
  children,
  wrapperId,
  isOpen = true,
  onClose = () => {},
  title = '',
  id,
}: Props) {
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
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
        tabIndex={-1}
        className={`${style.container} ${isOpen ? '' : style['container--close']} ${style.modal2}`}
        onClick={onClick}
        ref={modalBackground}
      >
        <button type='button' className={style['modal2__close-button']}>
          <Icon icon='close' />
        </button>

        <div
          className={style.modal2__content}
          id={id}
          ref={modalContent}
          aria-modal='true'
          role='dialog'
        >
          {!!title.length && (
            <div className={style.header}>
              <h1 className={style.title}>{title}</h1>
            </div>
          )}
          {children}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Modal2;
