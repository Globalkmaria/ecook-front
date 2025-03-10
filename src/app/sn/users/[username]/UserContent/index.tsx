'use client';

import { useState } from 'react';

import Icon from '@/components/Icon';
import { IconType } from '@/components/Icon/const';
import { Tab, TabsContainer } from '@/components/Tab';

import ProductList from './ProductList';
import RecipeList from './RecipeList';
import style from './style.module.scss';

function UserContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => setTabIndex(index);

  const CurrentList = TABS[tabIndex].Component;
  return (
    <section>
      <TabsContainer className={style.tabs}>
        {TABS.map((tab, index) => (
          <Tab
            className={style['tab']}
            key={index}
            index={index}
            onClick={() => handleTabChange(index)}
          >
            <Icon icon={tab.icon} />
            <span className={style['text']}>{tab.label}</span>
          </Tab>
        ))}
      </TabsContainer>
      <div className={style.content}>
        <CurrentList />
      </div>
    </section>
  );
}

export default UserContent;

const TABS: {
  icon: IconType;
  label: string;
  Component: () => JSX.Element;
}[] = [
  {
    icon: 'grid',
    label: 'RECIPES',
    Component: RecipeList,
  },
  {
    icon: 'product',
    label: 'PRODUCTS',
    Component: ProductList,
  },
];
