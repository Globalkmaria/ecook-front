'use client';

import { useState } from 'react';
import Link from 'next/link';

import style from './style.module.scss';

import {
  RecipeRecommendations,
  RecommendRecipe,
} from '@/services/recommend/type';

import { Tab2, TabsContainer2 } from '@/components/Tab2';
import CustomImage from '@/components/CustomImage';

import { GroupedRecipesByType } from './helper';

function RecommendContainer({
  groupedRecipesByType,
  types,
}: {
  groupedRecipesByType: GroupedRecipesByType;
  types: string[];
}) {
  const [selectedTag, setTab] = useState(types[0]);
  const onTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <section>
      <div className={style['header']}>
        <h2 className={style['title']}>Tag ideas : </h2>
        <div className={style['tabs']}>
          <TabsContainer2>
            {types.map((tag) => (
              <Tab2
                selected={selectedTag === tag}
                onClick={() => onTabChange(tag)}
                key={tag}
              >
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
  recipes: RecipeRecommendations['recipes'];
  type: string;
}) {
  return (
    <ul className={style['recommend-list']}>
      {recipes.map((recipe) => (
        <li key={recipe.key}>
          <RecommendItem recipe={recipe} />
        </li>
      ))}
      <li>
        <SeeMoreLink link={`/search?type=tag&q=${type}`} />
      </li>
    </ul>
  );
}

function RecommendItem({ recipe }: { recipe: RecommendRecipe }) {
  return (
    <Link
      scroll={false}
      href={`/recipes/${recipe.key}`}
      className={style['recommend-item']}
    >
      <CustomImage
        src={recipe.img}
        fill
        alt={recipe.name}
        className={style['img']}
      />
      <div className={style['hover-darker']} />
      <div className={style['img-overlay']}>
        <h2>{recipe.name}</h2>
      </div>
    </Link>
  );
}

function SeeMoreLink({ link }: { link: string }) {
  return (
    <Link href={link} className={style['recommend-item']}>
      <h2 className={style['see-more']}>See more</h2>
    </Link>
  );
}
