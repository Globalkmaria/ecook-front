import {
  Attributes,
  ButtonHTMLAttributes,
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

interface DropboxProps<T extends HTMLElement>
  extends HTMLAttributes<HTMLDivElement>,
    DropboxStyleProps,
    React.PropsWithChildren {
  containerRef: React.RefObject<T>;
  onCloseModal: () => void;
}

export function Dropbox<T extends HTMLElement>({
  children,
  containerRef,
  onCloseModal,
  vertical,
  horizontal,
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
        onCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const classNames = joinClassNames(
    className,
    ...[
      'container',
      vertical ? `vertical-${vertical}` : '',
      horizontal ? `horizontal-${horizontal}` : '',
    ].filter(Boolean),
  );

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export function DropboxWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const joinedClassName = joinClassNames(className, style.wrapper);

  return <div className={joinedClassName}>{children}</div>;
}

interface DropboxItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function DropboxItem({
  children,
  className,
  ...restProps
}: DropboxItemProps) {
  const joinedClassName = joinClassNames(className, style.item);

  return (
    <button type='button' className={joinedClassName} {...restProps}>
      {children}
    </button>
  );
}
