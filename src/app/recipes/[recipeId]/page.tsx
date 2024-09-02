'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import Chip, { ChipsContainer } from '@/components/Chip';
import { theme } from '@/styles/theme';
import { RECIPE_TABS, RecipeTab } from './const';

interface Props {
  params: { recipeId: string };
}

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

function Recipe({ params }: Props) {
  const [tab, setTab] = useState<RecipeTab>('Ingredients');

  const ingredients = <List items={INFO.Ingredients} />;
  const steps = <List items={INFO.Steps} />;
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
          <StyledTabs>
            {RECIPE_TABS.map((item) => (
              <Tab
                key={item}
                selected={item === tab}
                onClick={() => setTab(item)}
              >
                {item}
              </Tab>
            ))}
          </StyledTabs>

          <StyledInfo>
            {tab === 'Ingredients' && ingredients}
            {tab === 'Steps' && steps}
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

const StyledTabs = styled('div')({
  width: '100%',
  display: 'flex',
});

const Tab = styled('button')<{
  selected?: boolean;
}>(({ selected }) => ({
  flex: 1,
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontWeight: 500,

  borderBottom: `2px solid ${selected ? 'black' : 'transparent'}`,
}));

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

function List({ items }: { items: readonly string[] }) {
  return (
    <StyledList>
      {items.map((item, i) => (
        <StyledListItem key={item}>
          <input type='checkbox' id={i.toString()} />
          <label htmlFor={i.toString()}>{item}</label>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

const StyledList = styled('ul')``;
const StyledListItem = styled('li')`
  margin: 0.5rem 0;
  input {
    margin-right: 1rem;

    &:checked + label {
      color: ${theme.colors.grey500};
    }
  }
`;
