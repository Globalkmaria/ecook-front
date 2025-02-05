'use client';

import { useState } from 'react';
import Link from 'next/link';

import style from './style.module.scss';

import { RecipeRecommendations } from '@/services/recommend/type';

import { getSearchTagLink } from '@/helpers/links';

import { Tab2, TabsContainer2 } from '@/components/Tab2';
import Card from '@/components/Card';

function RecommendContainer({
  groupedRecipesByType,
  options,
  title,
}: {
  groupedRecipesByType: RecipeRecommendations[number];
  options: string[];
  title: string;
}) {
  const [selectedTag, setTab] = useState(options[0]);
  const onTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <section>
      <div className={style['header']}>
        <h2 className={style['title']}>{title} ideas : </h2>
        <div className={style['tabs']}>
          <TabsContainer2>
            {options.map((tag, index) => (
              <Tab2 index={index} onClick={() => onTabChange(tag)} key={tag}>
                {tag}
              </Tab2>
            ))}
          </TabsContainer2>
        </div>
      </div>
      <RecipeList
        recipes={groupedRecipesByType[selectedTag]}
        type={selectedTag}
      />
    </section>
  );
}

export default RecommendContainer;

function RecipeList({
  recipes,
  type,
}: {
  recipes: RecipeRecommendations[number][string];
  type: string;
}) {
  return (
    <ul className={style['recommend-list']}>
      {recipes.map((recipe) => (
        <li key={recipe.key} className={style['item']}>
          <Card
            data={recipe}
            imageProps={{ sizes: '(max-width: 1024px) 300px, 200px' }}
          />
        </li>
      ))}
      <li className={style['item']}>
        <SeeMoreLink link={getSearchTagLink(type)} />
      </li>
    </ul>
  );
}

function SeeMoreLink({ link }: { link: string }) {
  return (
    <Link href={link} className={style['see-more']}>
      <h2>See more</h2>
    </Link>
  );
}
