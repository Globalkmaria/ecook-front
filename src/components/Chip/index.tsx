import { joinClassNames } from '@/utils/style';
import style from './style.module.scss';

type ChipType = 'default' | 'warning' | 'info' | 'success';

export interface ChipProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  type?: ChipType;
}

function Chip({ children, className, border, type = 'default' }: ChipProps) {
  const borderClassName = border ? style['chip--border'] : '';
  const typeClassName = style[`chip--${type}`];

  const joinedClassName = joinClassNames(
    style.chip,
    borderClassName,
    typeClassName,
    className || '',
  );

  return <div className={joinedClassName}>{children}</div>;
}
export default Chip;

export function ChipGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${style['chip-list']} ${className}`}>{children}</div>;
}
