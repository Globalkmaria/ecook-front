'use client';

import { joinClassNames } from '@/utils/style';

import Icon from '@/components/Icon';
import { IconType } from '@/components/Icon/const';
import { Tab, TabsContainer, useTabContext } from '@/components/Tab';

import ProductList from './ProductList';
import RecipeList from './RecipeList';
import style from './style.module.scss';

function UserContent() {
  return (
    <section>
      <TabsContainer>
        <UserContentBody />
      </TabsContainer>
    </section>
  );
}

function UserContentBody() {
  const { selectedIndex } = useTabContext();
  const CurrentList = TABS[selectedIndex].Component;
  return (
    <>
      <div className={style.tabs}>
        {TABS.map((tab, index) => (
          <Tab
            className={joinClassNames(
              style['tab'],
              selectedIndex === index ? style['tab--selected'] : '',
            )}
            key={index}
            index={index}
          >
            <Icon icon={tab.icon} />
            <span className={style['text']}>{tab.label}</span>
          </Tab>
        ))}
      </div>
      <div className={style.content}>
        <CurrentList />
      </div>
    </>
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
