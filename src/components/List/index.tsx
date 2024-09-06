import style from './style.module.scss';

export function ListContainer({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return <li className={style['list-item']}>{children}</li>;
}
