import style from './HomeNav.module.scss';

import { AuthenticatedUser } from '@/app/helper';

import NavRightButtons from './Nav/NavRightButtons';
import Logo from './Logo';

interface HomeNavProps {
  user: AuthenticatedUser;
}

async function HomeNav({ user }: HomeNavProps) {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Logo />
        <NavRightButtons user={user} />
      </div>
    </nav>
  );
}

export default HomeNav;
