import Link from 'next/link';

import { HOME_LINK } from '@/helpers/links';

import style from './style.module.scss';

interface LogoProps {
  theme?: 'light' | 'dark';
}

function Logo({ theme = 'dark' }: LogoProps) {
  const titleClassName = `${style.title} ${theme === 'light' ? style.light : style.dark}`;
  return (
    <Link href={HOME_LINK} className={style.logo}>
      <h1 className={titleClassName}>E-COOK</h1>
    </Link>
  );
}

export default Logo;
