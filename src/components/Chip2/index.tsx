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

function ChipsContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${style['container']} ${className}`}>{children}</div>;
}

const Chip2 = {
  Chip,
  Container: ChipsContainer,
};

export default Chip2;
