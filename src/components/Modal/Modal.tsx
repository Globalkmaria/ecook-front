'use client';

import { memo, MouseEvent, ReactNode, useEffect, useRef } from 'react';

import { joinClassNames } from '@/utils/style';

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
  showCloseButton?: boolean;
  title?: string;
  id?: string;
  backgroundType?: 'light' | 'dark';
}

function Modal({
  children,
  wrapperId,
  isOpen = true,
  onClose = () => {},
  title = '',
  showCloseButton = true,
  id,
  backgroundType,
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

  const backgroundTypeClassName = backgroundType
    ? style[`background--${backgroundType}`]
    : '';
  const joinedClassName = joinClassNames(
    backgroundTypeClassName,
    style.container,
    isOpen ? '' : style['container--close'],
  );

  return (
    <ModalWrapper wrapperId={wrapperId}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={joinedClassName} onClick={onClick} ref={modalBackground}>
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
            {showCloseButton && <CloseButton onClick={onClose} />}
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

const CloseButton = memo(function CloseButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button type='button' onClick={onClick}>
      <Icon icon='close' />
    </button>
  );
});
