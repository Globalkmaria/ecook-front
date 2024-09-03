'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import Chip, { ChipsContainer } from '@/components/Chip';
import { Tab, TabsContainer } from '@/components/Tab';
import CheckboxList from '@/components/CheckboxList';
import { getListCheckboxInitialState } from '@/components/helpers';

import { RECIPE_TABS, RecipeTab } from './const';

const INFO = {
  name: 'Bibimbab',
  chips: ['Vegetarian', 'Healthy', 'Easy to prepare'],
  Ingredients: [
    '1 lb. spaghetti',
    '1 onion, chopped',
    '2 cloves garlic, minced',
    '1 lb. bacon, sliced',
    '1/2 cup heavy cream',
    '1/2 cup shredded mozzarella',
    '1/2 cup shredded cheddar',
    '1/2 cup shredded Parmesan',
    '1/4 cup grated Parmesan cheese',
    '1/4 cup grated mozzarella cheese',
    '1/4 cup grated feta cheese',
    '1/4 cup grated romano cheese',
    '1/2 cup grated pecorino Romano cheese',
    '1/2 cup grated Gorgonzola cheese',
    '1/4 cup grated fontina cheese',
    '1/4 cup grated provolone cheese',
  ],
  Steps: [
    'Cook pasta according to package instructions.',
    'Cook bacon according to package instructions.',
    'In a large pot, combine salted water, pasta, and cooked bacon.',
    'Cook and stir over medium heat until heated through.',
  ],
} as const;

interface Props {
  recipeId: string;
}

function Recipe({ recipeId }: Props) {
  const [tab, setTab] = useState<RecipeTab>('Ingredients');
  const [ingredientsChecked, setIngredientsChecked] = useState(
    getListCheckboxInitialState(INFO.Ingredients),
  );
  const [stepsChecked, setStepsChecked] = useState(
    getListCheckboxInitialState(INFO.Steps),
  );

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
        <Image src={'/img/img1.png'} fill alt='Picture of the author' />
      </StyledImgBox>

      <StyledContent>
        <StyledHeader>
          <StyledTitle>{INFO.name}</StyledTitle>
          <StyledChipsContainer>
            {INFO.chips.map((chip) => (
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
                items={INFO.Ingredients}
                onChange={onIngredientsToggle}
              />
            )}
            {tab === 'Steps' && (
              <CheckboxList
                state={stepsChecked}
                items={INFO.Steps}
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
