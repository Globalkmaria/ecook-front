'use client';

import { createContext, useContext, useState } from 'react';

import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';

const TabContext = createContext<
  | {
      selectedIndex: number;
      setSelectedIndex: (index: number) => void;
    }
  | undefined
>(undefined);

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabsContainer');
  }
  return context;
}

export function TabsContainer({ children }: { children: React.ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <TabContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </TabContext.Provider>
  );
}

export function TabGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={joinClassNames(style['tab-group'], className)}>
      {children}
    </div>
  );
}

interface TabProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  index: number;
}

export function Tab({ children, onClick, className, index }: TabProps) {
  const tabContext = useTabContext();

  const selectedClass =
    tabContext.selectedIndex === index ? style['tab--selected'] : '';

  const handleClick = () => {
    tabContext.setSelectedIndex(index);
    onClick?.();
  };

  const joinedClassName = joinClassNames(
    style['tab'],
    selectedClass,
    className,
  );

  return (
    <button onClick={handleClick} type='button' className={joinedClassName}>
      {children}
    </button>
  );
}
