import { ReactNode } from 'react';

import style from './modalContainer.module.scss';

interface Props {
  children: ReactNode;
}

function ModalContainer({ children }: Props) {
  return <div className={style.container}>{children}</div>;
}

export default ModalContainer;
