'use client';

import { useState } from 'react';

import style from './style.module.scss';

import Icon from '@/components/Icon';
import { Tab, TabsContainer } from '@/components/Tab';
import { IconButtonType } from '@/components/Icon/const';

import RecipeList from './RecipeList';
import ProductList from './ProductList';

function UserContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => setTabIndex(index);

  return (
    <section>
      <TabsContainer>
        {TABS.map((tab, index) => (
          <Tab key={index} index={index} onClick={() => handleTabChange(index)}>
            <Icon icon={tab.icon} /> {tab.label}
          </Tab>
        ))}
      </TabsContainer>
      <div className={style.content}>
        {tabIndex === 0 && <RecipeList />}
        {tabIndex === 1 && <ProductList />}
      </div>
    </section>
  );
}

export default UserContent;

const TABS: {
  icon: IconButtonType;
  label: string;
}[] = [
  {
    icon: 'grid',
    label: 'RECIPES',
  },
  {
    icon: 'grid',
    label: 'PRODUCTS',
  },
];
