import style from './style.module.scss';

import { joinClassNames } from '@/utils/style';

import AnchorUnderline, {
  AnchorUnderlineProps,
} from '../Anchor/AnchorUnderline';

export interface AnchorChipProps extends AnchorUnderlineProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}

function Chip({
  children,
  className,
  border,
  href,
  ...restProps
}: AnchorChipProps) {
  const borderClassName = border ? style['chip--border'] : '';

  const joinedClassName = joinClassNames(
    style.chip,
    borderClassName,
    className || '',
  );

  return (
    <AnchorUnderline href={href} {...restProps}>
      <div className={joinedClassName}>{children}</div>
    </AnchorUnderline>
  );
}

function ChipsContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${style['chip-list']} ${className}`}>{children}</div>;
}

const AnchorChips = {
  Chip,
  Container: ChipsContainer,
};

export default AnchorChips;
