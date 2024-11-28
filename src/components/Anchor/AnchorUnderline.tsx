import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

import style from './AnchorUnderline.module.scss';

import { joinClassNames } from '@/utils/style';

type Props = {
  children?: ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

function AnchorUnderline({ children, className, href, ...rest }: Props) {
  const joinedClassName = joinClassNames(className, style['link']);

  return (
    <Link href={href} className={joinedClassName} {...rest}>
      {children}
    </Link>
  );
}

export default AnchorUnderline;
