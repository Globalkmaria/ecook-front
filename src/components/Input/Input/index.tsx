import { InputHTMLAttributes, memo, ReactNode } from 'react';
import style from './style.module.scss';
import { joinClassNames } from '@/utils/style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

function Input({ children, className, ...restProps }: Props) {
  const joinedClassNames = joinClassNames(style.input, className);
  return (
    <input className={joinedClassNames} type='text' {...restProps}>
      {children}
    </input>
  );
}

export default memo(Input);
