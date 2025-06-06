import { AnchorHTMLAttributes, ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';

import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export type Props = {
  children?: ReactNode;
} & BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps;

function Anchor({
  variant = 'primary',
  children,
  className,
  href,
  ...rest
}: Props) {
  const variantClassName = style[`link-contained--${variant}`];

  const joinedClassName = joinClassNames(
    style['link'],
    variantClassName,
    className,
  );

  return (
    <Link href={href} className={joinedClassName} {...rest}>
      {children}
    </Link>
  );
}

export default Anchor;
