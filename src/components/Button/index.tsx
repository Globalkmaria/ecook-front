import { ButtonHTMLAttributes, ReactNode } from 'react';

import style from './style.module.scss';
import { joinClassNames } from '@/utils/style';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export type Props = {
  children?: ReactNode;
} & ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  disabled,
  variant = 'primary',
  children,
  className,
  ...rest
}: Props) {
  const variantClassName = style[`button-contained--${variant}`];

  const joinedClassName = joinClassNames(
    className,
    style['button'],
    variantClassName,
  );

  return (
    <button
      type='button'
      className={joinedClassName}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
