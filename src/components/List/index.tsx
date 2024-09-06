import style from './style.module.scss';

export function ListContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={className ?? ''}>{children}</ul>;
}

export function ListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={`${style['list-item']} ${className ?? ''}`}>{children}</li>
  );
}
