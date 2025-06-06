import Link from 'next/link';

import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';
import CustomImage, { CustomImageProps } from '../CustomImage';
import Skeleton from '../Skeleton';

export interface ImgCardProps {
  link: string;
  children: React.ReactNode;
  imgProps: CustomImageProps;
  className?: string;
  noImgContent?: React.ReactNode;
}

function ImgCardContainer({
  link,
  children,
  imgProps,
  className,
  noImgContent,
}: ImgCardProps) {
  const showNoImgComponent = !imgProps.src && noImgContent;

  const joinedClassName = className
    ? joinClassNames(style['card'], className)
    : style['card'];

  return (
    <Link scroll={false} href={link} className={joinedClassName}>
      {showNoImgComponent ? (
        noImgContent
      ) : (
        <CustomImage fill imgClassName={style['img']} {...imgProps} />
      )}
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

function ImgCardSkeleton() {
  return (
    <div className={style['card']}>
      <Skeleton className={style['img']} />
    </div>
  );
}

const ImgCard = {
  Container: ImgCardContainer,
  TopOverlay,
  BottomOverlay,
  Skeleton: ImgCardSkeleton,
};

export default ImgCard;
