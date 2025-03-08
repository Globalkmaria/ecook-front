import { ButtonHTMLAttributes } from 'react';

import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';
import Icon, { IconProps } from '../Icon';

export interface IconButtonProps
  extends IconProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

function IconButton({ icon, className, ...restProps }: IconButtonProps) {
  const joinedClassName = joinClassNames(className, style.button);
  return (
    <button type='button' className={joinedClassName} {...restProps}>
      <Icon icon={icon} />
    </button>
  );
}

export default IconButton;
