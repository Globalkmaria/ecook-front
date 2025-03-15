import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';

interface Props {
  className?: string;
  border?: boolean;
}
function Skeleton({ className, border }: Props) {
  const joinedClassName = joinClassNames(
    style['skeleton'],
    className,
    border ? style['border'] : '',
  );
  return <div className={joinedClassName} />;
}

export default Skeleton;
