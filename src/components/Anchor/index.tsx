import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

import style from './style.module.scss';
import { joinClassNames } from '@/utils/style';

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
