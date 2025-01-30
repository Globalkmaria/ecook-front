import Link from 'next/link';

import style from './style.module.scss';

import CustomImage, { CustomImageProps } from '../CustomImage';

export interface ImgCardProps {
  link: string;
  children: React.ReactNode;
  imgProps: CustomImageProps;
}

function ImgCardContainer({ link, children, imgProps }: ImgCardProps) {
  return (
    <Link scroll={false} href={link} className={style['card']}>
      <CustomImage fill imgClassName={style['img']} {...imgProps} />
      <div className={style['hover-darker']} />
      {children}
    </Link>
  );
}

function TopOverlay({ children }: { children: React.ReactNode }) {
  return <div className={style['top-overlay']}>{children}</div>;
}

function BottomOverlay({ children }: { children: React.ReactNode }) {
  return <div className={style['bottom-overlay']}>{children}</div>;
}

const ImgCard = {
  Container: ImgCardContainer,
  TopOverlay,
  BottomOverlay,
};

export default ImgCard;
