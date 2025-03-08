import Logo from './Logo';
import NavRightButtons from './Nav/NavRightButtons';
import NavWrapper from './Nav/NavWrapper';

function HomeNav() {
  return (
    <NavWrapper>
      <Logo />
      <NavRightButtons />
    </NavWrapper>
  );
}

export default HomeNav;
