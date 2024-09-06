import style from './style.module.scss';

function Chip({ children }: { children: React.ReactNode }) {
  return <div className={style.chip}>{children}</div>;
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
