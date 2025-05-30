'use client';

import { memo, ReactEventHandler, useEffect, useState } from 'react';

import Image, { ImageProps } from 'next/image';

import { joinClassNames } from '@/utils/style';

import style from './style.module.scss';
import Skeleton from '../Skeleton';

export interface CustomImageProps extends Omit<ImageProps, 'src'> {
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

  useEffect(() => {
    setIsLoading(true);
    setImgSrc(src);
  }, [src]);

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
