import { joinClassNames } from '@/utils/style';
import style from './style.module.scss';

function Chip({
  children,
  className,
  border,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) {
  const borderClassName = border ? style['chip--border'] : '';

  const joinedClassName = joinClassNames(
    style.chip,
    borderClassName,
    className || '',
  );

  return <div className={joinedClassName}>{children}</div>;
}
export default Chip;

export function ChipsContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${style['chip-list']} ${className}`}>{children}</div>;
}
