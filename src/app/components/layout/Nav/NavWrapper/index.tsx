import { ReactNode } from 'react';

import style from './style.module.scss';

interface Props {
  children: ReactNode;
}

function NavWrapper({ children }: Props) {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>{children}</div>
    </nav>
  );
}

export default NavWrapper;
