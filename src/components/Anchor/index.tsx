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
    href: string;
  };

function Anchor({
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
  );

  return (
    <Link href={href} className={joinedClassName} {...rest}>
      {children}
    </Link>
  );
}

export default Anchor;
