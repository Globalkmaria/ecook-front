import style from './HomeNav.module.scss';

import NavRightButtons from './Nav/NavRightButtons';
import Logo from './Logo';

async function HomeNav() {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Logo />
        <NavRightButtons />
      </div>
    </nav>
  );
}

export default HomeNav;
