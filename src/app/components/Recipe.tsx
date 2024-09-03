'use client';

import Image from 'next/image';
import { Libre_Bodoni, Roboto } from 'next/font/google';
import styled from 'styled-components';

import { theme } from '@/styles/theme';
import Chip, { ChipsContainer } from '@/components/Chip';
import Link from 'next/link';
import { recipes } from '@/data/recipe';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500'],
});

interface Props {
  idx: string;
}

function Recipe({ idx }: Props) {
  const recipe = idx ? recipes[idx] : null;

  if (recipe === null) return null;

  return (
    <StyledLink $idx={idx} scroll={false} href={`/recipes/${idx}`}>
      <StyledContainer className={roboto.className}>
        <StyledHoverContent>
          <StyledHoverContentImgBox>
            <Image
              src={`/img/img${idx}.png`}
              fill
              alt='Picture of the author'
            />
          </StyledHoverContentImgBox>
          <StyledHoverContentH2 className={libre.className}>
            {recipe.name}
          </StyledHoverContentH2>
        </StyledHoverContent>

        <StyledImgOuterBox>
          <StyledImgInnerBox $idx={idx}>
            <Image
              src={`/img/img${idx}.png`}
              fill
              alt='Picture of the author'
            />
          </StyledImgInnerBox>
        </StyledImgOuterBox>

        <StyledInformation>
          <StyledInformationHeader>
            <StyledTitle> {recipe.name}</StyledTitle>
            <ChipsContainer>
              {recipe.filters.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </ChipsContainer>
          </StyledInformationHeader>
          <StyledText>{recipe.description}</StyledText>
        </StyledInformation>
      </StyledContainer>
    </StyledLink>
  );
}

export default Recipe;

const StyledLink = styled(Link)<{
  $idx: Props['idx'];
}>(({ $idx }) => ({
  gridArea: `item${$idx}`,
  minHeight: '300px',
}));

const StyledContainer = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  position: 'relative',
});

const StyledHoverContent = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 2,
  backgroundColor: 'black',
  overflow: 'hidden',

  opacity: 0,

  [`${StyledContainer}:hover &`]: {
    opacity: 1,

    img: {
      animation: `1s showBorderAnimation forwards`,
    },

    h2: {
      animation: `3.5s leftToRightAnimation infinite linear`,
    },
  },

  '@keyframes leftToRightAnimation': {
    '0%': {
      transform: 'translateX(100%) translateY(-50%)',
    },
    '100%': {
      transform: 'translateX(-100%) translateY(-50%)',
    },
  },

  '@keyframes showBorderAnimation': {
    '0%': {
      borderRadius: '0px',
    },
    '100%': {
      borderRadius: '40px',
    },
  },
});

const StyledHoverContentImgBox = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',

  img: {
    objectFit: 'cover',
  },
});

const StyledHoverContentH2 = styled('h2')({
  display: 'block',
  width: '100%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontStyle: 'italic',
  fontSize: '5rem',
  fontWeight: 500,
});

const StyledImgOuterBox = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const StyledImgInnerBox = styled('div')<{
  $idx: Props['idx'];
}>(({ $idx }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  gridArea: `item${$idx}`,

  img: {
    objectFit: 'cover',
  },
}));

const StyledInformation = styled('div')({
  minHeight: '300px',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

const StyledInformationHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  padding: '0.6rem 0.5rem 0.5rem',
  backgroundColor: theme.colors.blurry700,
});

const StyledTitle = styled('h2')({
  fontWeight: 500,
  fontSize: '1.2rem',
  textAlign: 'center',
});

const StyledText = styled('p')({
  fontWeight: 400,
  fontSize: '0.8rem',
  backgroundColor: theme.colors.blurry700,
  padding: '0.7rem 0.4rem',
  textAlign: 'center',
});
