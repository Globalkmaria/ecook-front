import style from './notFound.module.scss';

import { HOME_LINK } from '@/helpers/links';

import AnchorUnderline from '@/components/Anchor/AnchorUnderline';

import Logo from './components/layout/Logo';
import NavWrapper from './components/layout/Nav/NavWrapper';

export default function NotFound() {
  return (
    <div>
      <NavWrapper>
        <Logo />
      </NavWrapper>
      <div className={style.content}>
        <h2>Page Not Found</h2>
        <p>Could not find the requested page.</p>
        <AnchorUnderline href={HOME_LINK}>Return Home</AnchorUnderline>
      </div>
    </div>
  );
}
