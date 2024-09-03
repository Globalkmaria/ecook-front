'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import Chip, { ChipsContainer } from '@/components/Chip';
import { Tab, TabsContainer } from '@/components/Tab';
import CheckboxList from '@/components/CheckboxList';
import { getListCheckboxInitialState } from '@/components/helpers';

import { recipes } from '@/data/recipe';

import { RECIPE_TABS, RecipeTab } from './const';

interface Props {
  recipeId: string;
}

function Recipe({ recipeId }: Props) {
  const recipe = recipeId ? recipes[recipeId] : null;
  const [tab, setTab] = useState<RecipeTab>('Ingredients');
  const [ingredientsChecked, setIngredientsChecked] = useState(
    getListCheckboxInitialState(recipe?.ingredients ?? []),
  );
  const [stepsChecked, setStepsChecked] = useState(
    getListCheckboxInitialState(recipe?.steps ?? []),
  );

  if (!recipe) return null;

  const onIngredientsToggle = (id: string) => {
    setIngredientsChecked({
      ...ingredientsChecked,
      [id]: !ingredientsChecked[id],
    });
  };

  const onStepsToggle = (id: string) => {
    setStepsChecked({ ...stepsChecked, [id]: !stepsChecked[id] });
  };

  return (
    <StyledRecipe>
      <StyledImgBox>
        <Image src={`/img/img${recipeId}.png`} fill alt={recipe.name} />
      </StyledImgBox>

      <StyledContent>
        <StyledHeader>
          <StyledTitle>{recipe.name}</StyledTitle>
          <StyledChipsContainer>
            {recipe.filters.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </StyledChipsContainer>
        </StyledHeader>

        <StyledBody>
          <TabsContainer>
            {RECIPE_TABS.map((item) => (
              <Tab
                key={item}
                selected={item === tab}
                onClick={() => setTab(item)}
              >
                {item}
              </Tab>
            ))}
          </TabsContainer>

          <StyledInfo>
            {tab === 'Ingredients' && (
              <CheckboxList
                state={ingredientsChecked}
                items={recipe.ingredients}
                onChange={onIngredientsToggle}
              />
            )}
            {tab === 'Steps' && (
              <CheckboxList
                state={stepsChecked}
                items={recipe.steps}
                onChange={onStepsToggle}
              />
            )}
          </StyledInfo>
        </StyledBody>
      </StyledContent>
    </StyledRecipe>
  );
}

export default Recipe;

const StyledBody = styled('div')({
  width: '100%',
  padding: '1rem 3rem',
  marginTop: '2rem',
});

const StyledInfo = styled('div')({
  marginTop: '2rem',
});

const StyledRecipe = styled('div')({
  display: 'flex',
  height: '100%',
});

const StyledImgBox = styled('div')({
  flex: '1',
  position: 'relative',
  width: '100%',
  height: '100%',
  margin: '0 3rem',

  img: {
    objectFit: 'contain',
  },
});

const StyledContent = styled('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderLeft: '1px solid',
  overflow: 'overlay',
});

const StyledHeader = styled('div')({});

const StyledTitle = styled('h1')({
  fontWeight: 500,
  fontStyle: 'italic',
  fontSize: '4rem',
  textAlign: 'center',
});

const StyledChipsContainer = styled(ChipsContainer)({
  marginTop: '1rem',
});
