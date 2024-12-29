import style from './style.module.scss';

import { AuthenticatedUser } from '@/app/helper';

import NavRightButtons from './NavRightButtons';
import Logo from '../Logo';
import Search from '../../Search';

interface Props {
  user: AuthenticatedUser;
}

async function Nav({ user }: Props) {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Logo />

        <div className={style.search}>
          <Search />
        </div>
        <div className={style['right-buttons-containers']}>
          <NavRightButtons user={user} />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
