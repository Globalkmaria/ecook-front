import Link from 'next/link';

import style from './style.module.scss';

import CustomImage, { CustomImageProps } from '../CustomImage';
import { joinClassNames } from '@/utils/style';

export interface ImgCardProps {
  link: string;
  children: React.ReactNode;
  imgProps: CustomImageProps;
  className?: string;
}

function ImgCardContainer({
  link,
  children,
  imgProps,
  className,
}: ImgCardProps) {
  const joinedClassName = className
    ? joinClassNames(style['card'], className)
    : style['card'];
  return (
    <Link scroll={false} href={link} className={joinedClassName}>
      <CustomImage fill imgClassName={style['img']} {...imgProps} />
      <div className={style['hover-darker']} />
      {children}
    </Link>
  );
}

function TopOverlay({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const joinedClassName = className
    ? joinClassNames(style['top-overlay'], className)
    : style['top-overlay'];
  return <div className={joinedClassName}>{children}</div>;
}

function BottomOverlay({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const joinedClassName = className
    ? joinClassNames(style['bottom-overlay'], className)
    : style['bottom-overlay'];
  return <div className={joinedClassName}>{children}</div>;
}

const ImgCard = {
  Container: ImgCardContainer,
  TopOverlay,
  BottomOverlay,
};

export default ImgCard;
