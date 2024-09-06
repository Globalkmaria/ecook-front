'use client';

import style from './style.module.scss';

export function Tab({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  const selectedClass = selected ? style['tab--selected'] : '';
  return (
    <button
      onClick={onClick}
      type='button'
      className={`${style.tab} ${selectedClass}`}
    >
      {children}
    </button>
  );
}

export function TabsContainer({ children }: { children: React.ReactNode }) {
  return <div className={style['tabs-container']}>{children}</div>;
}
