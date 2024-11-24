'use client';

import {
  ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
} from 'react';
import style from './style.module.scss';
import { joinClassNames } from '@/utils/style';

export interface DropboxStyleProps {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
  width?: number;
}

export interface DropboxProps<T extends HTMLElement>
  extends HTMLAttributes<HTMLDivElement>,
    DropboxStyleProps,
    React.PropsWithChildren {
  containerRef: React.RefObject<T>;
  onCloseModal?: () => void;
}

export function Dropbox<T extends HTMLElement>({
  children,
  containerRef,
  onCloseModal,
  vertical = 'bottom',
  horizontal = 'right',
  className,
  ...props
}: DropboxProps<T>) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as Element).closest('div[role="dialog"]')) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onCloseModal && onCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const classNames = joinClassNames(
    className,
    style.container,
    ...[
      vertical ? style[`vertical-${vertical}`] : '',
      horizontal ? style[`horizontal-${horizontal}`] : '',
    ].filter(Boolean),
  );

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export const DropboxWrapper = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className }, ref) => {
  const joinedClassName = joinClassNames(className, style.wrapper);

  return (
    <div className={joinedClassName} ref={ref}>
      {children}
    </div>
  );
});

DropboxWrapper.displayName = 'DropboxWrapper';

interface DropboxItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}

export function DropboxItem({
  children,
  className,
  selected,
  ...restProps
}: DropboxItemProps) {
  const joinedClassName = joinClassNames(
    className,
    selected ? style['item--selected'] : '',
    style.item,
  );

  return (
    <button type='button' className={joinedClassName} {...restProps}>
      {children}
    </button>
  );
}
