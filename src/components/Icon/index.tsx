import { joinClassNames } from '@/utils/style';

import { ICONS, IconType } from './const';
import style from './style.module.scss';

export interface IconProps {
  icon: IconType;
  className?: string;
}

function Icon({ icon, className }: IconProps) {
  const joinedClassName = className
    ? joinClassNames(style.icon, className)
    : style.icon;

  return <div className={joinedClassName}>{ICONS[icon]}</div>;
}

export default Icon;
