import style from './style.module.scss';

import NavRightButtons from './NavRightButtons';
import Logo from '../Logo';
import Search from '../../Search';

async function Nav() {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Logo />
        <div className={style.search}>
          <Search />
        </div>
        <NavRightButtons />
      </div>
    </nav>
  );
}

export default Nav;
