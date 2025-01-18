'use client';

import { memo, ReactEventHandler, useState } from 'react';
import Image, { ImageProps } from 'next/image';

import style from './style.module.scss';

import Skeleton from '../Skeleton';
import { joinClassNames } from '@/utils/style';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  loadingClassName?: string;
  imgClassName?: string;
}

const CustomImage = ({
  src,
  fallbackSrc,
  alt,
  className,
  loadingClassName,
  imgClassName,
  onLoad,
  onError,
  ...props
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const joinedClassName = joinClassNames(style['custom-image'], className);

  const onLoadHandler: ReactEventHandler<HTMLImageElement> = (e) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const onErrorHandler: ReactEventHandler<HTMLImageElement> = (e) => {
    setIsLoading(false);
    setImgSrc(fallbackSrc ?? '/img/default.jpg');
    onError?.(e);
  };

  return (
    <div className={joinedClassName}>
      {isLoading && <Skeleton className={loadingClassName} />}
      <Image
        className={imgClassName}
        src={imgSrc}
        alt={alt}
        onError={onErrorHandler}
        onLoad={onLoadHandler}
        {...props}
      />
    </div>
  );
};

export default memo(CustomImage);
