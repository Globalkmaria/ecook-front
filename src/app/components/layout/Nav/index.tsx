import style from './style.module.scss';

import NavRightButtons from './NavRightButtons';
import Logo from '../Logo';
import Search from '../../common/Search';

function Nav() {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Logo />

        <div className={style.search}>
          <Search />
        </div>
        <div className={style['right-buttons-containers']}>
          <NavRightButtons />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
