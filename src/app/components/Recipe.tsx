'use client';

import Image from 'next/image';
import { Libre_Bodoni, Roboto } from 'next/font/google';
import styled from 'styled-components';

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
    <StyledContainer idx={idx} className={roboto.className}>
      <StyledHoverContent>
        <StyledHoverContentImgBox>
          <Image src={'/img/img1.png'} fill alt='Picture of the author' />
        </StyledHoverContentImgBox>
        <StyledHoverContentH2 className={libre.className}>
          Bibimbab
        </StyledHoverContentH2>
      </StyledHoverContent>
      <StyledImgOuterBox>
        <StyledImgInnerBox idx={idx}>
          <Image src={'/img/img1.png'} fill alt='Picture of the author' />
        </StyledImgInnerBox>
      </StyledImgOuterBox>
      <StyledInformation>
        <StyledInformationHeader>
          <StyledTitle>Bibimbab</StyledTitle>
          <StyledChip>Vege</StyledChip>
        </StyledInformationHeader>

        <StyledText>Spaghetti Carbonara</StyledText>
      </StyledInformation>
    </StyledContainer>
  );
}

export default Recipe;

const StyledChip = styled('span')({
  padding: '0.25rem 0.7rem',
  borderRadius: '15px',
  backgroundColor: '#f5f5f5',
  fontSize: '0.8rem',
  fontWeight: 400,

  '&:hover': {
    backgroundColor: '#ddd',
  },
});

const StyledContainer = styled('div')<{
  idx: number;
}>(({ idx }) => ({
  display: 'flex',
  flexDirection: 'column',
  gridArea: `item${idx}`,
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
  idx: number;
}>(({ idx }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  gridArea: `item${idx}`,
}));

const StyledInformation = styled('div')({
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
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
});

const StyledTitle = styled('h2')({
  fontWeight: 500,
  fontSize: '1.2rem',
});

const StyledText = styled('p')({
  fontWeight: 400,
  fontSize: '0.8rem',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  padding: '0.5rem 0',
  textAlign: 'center',
});
