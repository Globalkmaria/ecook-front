'use client';

import { MouseEvent, ReactNode, useEffect, useRef } from 'react';

import useEscapeKey from '@/hooks/useEscapeKey';
import useHideScroll from '@/hooks/useHideScroll';

import style from './modal.module.scss';
import ModalWrapper from './ModalWrapper';
import Icon from '../Icon';

interface Props {
  children: ReactNode;
  wrapperId?: string;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  id?: string;
  closeOnOutSideClick?: boolean;
}

function Modal2({
  children,
  wrapperId,
  isOpen = true,
  onClose = () => {},
  closeOnOutSideClick = true,
  title = '',
  id,
}: Props) {
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEscapeKey({ onClose, target: modalBackground, portalId: wrapperId });
  useHideScroll({ isOpen });

  const onOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      closeOnOutSideClick &&
      !closeButton.current?.contains(e.target as Node) &&
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
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        tabIndex={-1}
        className={`${style.container} ${isOpen ? '' : style['container--close']} ${style.modal2}`}
        onClick={onOutsideClick}
        ref={modalBackground}
      >
        <button
          ref={closeButton}
          type='button'
          className={style['modal2__close-button']}
          onClick={onClose}
        >
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
