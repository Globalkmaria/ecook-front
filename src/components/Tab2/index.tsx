'use client';

import { createContext, useContext, useState } from 'react';
import style from './style.module.scss';

const TabContext = createContext<
  | {
      selectedIndex: number;
      setSelectedIndex: (index: number) => void;
    }
  | undefined
>(undefined);

export function TabsContainer2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <TabContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <div className={`${style['tabs-container']} ${className ?? ''}`}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

interface Tab2Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  index: number;
}

export function Tab2({ children, onClick, className, index }: Tab2Props) {
  const tabContext = useContext(TabContext);
  if (!tabContext) {
    throw new Error('Tab2 must be used within a TabsContainer2');
  }

  const selectedClass =
    tabContext.selectedIndex === index ? style['tab--selected'] : '';

  const handleClick = () => {
    tabContext.setSelectedIndex(index);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      type='button'
      className={`${style.tab} ${selectedClass} ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
