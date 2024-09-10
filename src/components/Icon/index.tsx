import style from './style.module.scss';

import { ICONS, IconButtonType } from './const';
import { joinClassNames } from '@/utils/style';

export interface IconProps {
  icon: IconButtonType;
  className?: string;
}

function Icon({ icon, className }: IconProps) {
  const joinedClassName = className
    ? joinClassNames(style.icon, className)
    : style.icon;

  return <div className={joinedClassName}>{ICONS[icon]}</div>;
}

export default Icon;