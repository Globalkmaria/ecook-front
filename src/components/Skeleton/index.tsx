import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';

interface Props {
  className?: string;
}
function Skeleton({ className }: Props) {
  const joinedClassName = joinClassNames(style['skeleton'], className);
  return <div className={joinedClassName} />;
}

export default Skeleton;
