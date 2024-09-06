import style from './style.module.scss';

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
