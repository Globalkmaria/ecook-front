import Image from 'next/image';
import { Libre_Bodoni } from 'next/font/google';

import style from './Recipe.module.scss';

import Chip, { ChipsContainer } from '@/components/Chip';
import Link from 'next/link';
import { recipes } from '@/data/recipe';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

interface Props {
  idx: string;
}

function Recipe({ idx }: Props) {
  const recipe = idx ? recipes[idx] : null;

  if (recipe === null) return null;

  return (
    <Link
      className={`${style.link} ${style[`item--${idx}`]}`}
      scroll={false}
      href={`/recipes/${idx}`}
    >
      <div className={style.container}>
        <div className={style['hover-content']}>
          <div className={style['hover-content__img-box']}>
            <Image src={`/img/img${idx}.png`} fill alt={recipe.name} />
          </div>
          <h2 className={`${libre.className} ${style['hover-content__name']}`}>
            {recipe.name}
          </h2>
        </div>

        <div className={style['img-wrapper']}>
          <div className={`${style[`item--${idx}`]} ${style['img-box']}`}>
            <Image src={`/img/img${idx}.png`} fill alt={recipe.name} />
          </div>
        </div>

        <div className={style.information}>
          <div className={style.information__header}>
            <h2 className={style.information__title}> {recipe.name}</h2>
            <ChipsContainer>
              {recipe.filters.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </ChipsContainer>
          </div>
          <p className={style.information__text}>{recipe.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;

// const StyledLink = styled(Link)<{ $idx: Props['idx'] }>`
//   grid-area: ${({ $idx }) => `item${$idx}`};
//   min-height: 300px;
// `;

// const StyledContainer = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   border: 1px solid;
//   position: relative;
// `;

// const StyledHoverContent = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   z-index: 2;
//   background-color: ${({ theme }) => theme.colors.black};
//   overflow: hidden;
//   opacity: 0;

//   ${StyledContainer}:hover & {
//     opacity: 1;

//     img {
//       animation: 1s showBorderAnimation forwards;
//     }

//     h2 {
//       animation: 3.5s leftToRightAnimation infinite linear;
//     }
//   }

//   @keyframes leftToRightAnimation {
//     0% {
//       transform: translateX(100%) translateY(-50%);
//     }
//     100% {
//       transform: translateX(-100%) translateY(-50%);
//     }
//   }

//   @keyframes showBorderAnimation {
//     0% {
//       border-radius: 0px;
//     }
//     100% {
//       border-radius: 40px;
//     }
//   }
// `;

// const StyledHoverContentImgBox = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;

//   img {
//     object-fit: cover;
//   }
// `;

// const StyledHoverContentH2 = styled.h2`
//   display: block;
//   width: 100%;
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   font-style: italic;
//   font-size: 5rem;
//   font-weight: 500;
// `;

// const StyledImgOuterBox = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
// `;

// const StyledImgInnerBox = styled.div<{ $idx: Props['idx'] }>`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   grid-area: ${({ $idx }) => `item${$idx}`};

//   img {
//     object-fit: cover;
//   }
// `;

// const StyledInformation = styled.div`
//   min-height: 300px;
//   z-index: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 100%;
// `;

// const StyledInformationHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 5px;
//   padding: 0.6rem 0.5rem 0.5rem;
//   background-color: ${({ theme }) => theme.colors.blurry700};
// `;

// const StyledTitle = styled.h2`
//   font-weight: 500;
//   font-size: 1.2rem;
//   text-align: center;
// `;

// const StyledText = styled.p`
//   font-weight: 400;
//   font-size: 0.8rem;
//   background-color: ${({ theme }) => theme.colors.blurry700};
//   padding: 0.7rem 0.4rem;
//   text-align: center;
// `;
