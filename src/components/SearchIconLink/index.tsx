import Link, { LinkProps } from 'next/link';

import style from './style.module.scss';
import Icon from '../Icon';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

function SearchIconLink({ href }: Props) {
  return (
    <Link className={style['search-icon']} href={href}>
      <div className={style['search-icon__container']}>
        <Icon icon='search' />
      </div>
    </Link>
  );
}

export default SearchIconLink;
