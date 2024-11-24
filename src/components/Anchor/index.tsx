import { AnchorHTMLAttributes, ReactNode } from 'react';

import style from './style.module.scss';
import { joinClassNames } from '@/utils/style';
import Link from 'next/link';

export interface LinkProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export type Props = {
  children?: ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
    href: string;
  };

function Anchor({
  disabled,
  variant = 'primary',
  children,
  className,
  href,
  ...rest
}: Props) {
  const variantClassName = style[`link-contained--${variant}`];

  const joinedClassName = joinClassNames(
    className,
    style['link'],
    variantClassName,
    disabled ? style['link--disabled'] : '',
  );

  return (
    <Link href={href} className={joinedClassName} {...rest}>
      {children}
    </Link>
  );
}

export default Anchor;
