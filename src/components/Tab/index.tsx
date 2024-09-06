'use client';

import style from './style.module.scss';

export function Tab({
  children,
  selected,
  onClick,
  className,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) {
  const selectedClass = selected ? style['tab--selected'] : '';
  return (
    <button
      onClick={onClick}
      type='button'
      className={`${style.tab} ${selectedClass} ${className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function TabsContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${style['tabs-container']} ${className ?? ''}`}>
      {children}
    </div>
  );
}
