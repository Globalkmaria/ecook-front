'use client';

import Image from 'next/image';
import { Libre_Bodoni, Roboto } from 'next/font/google';
import styled from 'styled-components';

import { theme } from '@/styles/theme';
import Chip from '@/components/Chip';
import Link from 'next/link';

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
  idx: number;
}

function Recipe({ idx }: Props) {
  return (
    <StyledContainer $idx={idx} className={roboto.className}>
      <Link scroll={false} href={`/recipes/${idx}`}>
        <StyledHoverContent>
          <StyledHoverContentImgBox>
            <Image src={'/img/img1.png'} fill alt='Picture of the author' />
          </StyledHoverContentImgBox>
          <StyledHoverContentH2 className={libre.className}>
            Bibimbab
          </StyledHoverContentH2>
        </StyledHoverContent>

        <StyledImgOuterBox>
          <StyledImgInnerBox $idx={idx}>
            <Image src={'/img/img1.png'} fill alt='Picture of the author' />
          </StyledImgInnerBox>
        </StyledImgOuterBox>

        <StyledInformation>
          <StyledInformationHeader>
            <StyledTitle>Bibimbab</StyledTitle>
            <Chip>Vege</Chip>
          </StyledInformationHeader>
          <StyledText>Spaghetti Carbonara</StyledText>
        </StyledInformation>
      </Link>
    </StyledContainer>
  );
}

export default Recipe;

const StyledContainer = styled('div')<{
  $idx: number;
}>(({ $idx }) => ({
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  gridArea: `item${$idx}`,
  border: '1px solid',
  position: 'relative',
}));

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
});

const StyledHoverContentH2 = styled('h2')({
  fontStyle: 'italic',
  display: 'block',
  width: '100%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '5rem',
  fontWeight: 500,
});

const StyledImgOuterBox = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const StyledImgInnerBox = styled('div')<{
  $idx: number;
}>(({ $idx }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  gridArea: `item${$idx}`,
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
});

const StyledText = styled('p')({
  fontWeight: 400,
  fontSize: '0.8rem',
  backgroundColor: theme.colors.blurry700,
  padding: '0.7rem 0',
  textAlign: 'center',
});
