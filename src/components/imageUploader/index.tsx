'use client';

import React, { memo } from 'react';
import dynamic from 'next/dynamic';

import style from './style.module.scss';

import { joinClassNames } from '@/utils/style';

import { ImageUploaderContentProps } from './ImageUploaderContent';

const ImageUploaderContent = dynamic(
  () => import('@/components/imageUploader/ImageUploaderContent'),
  {
    ssr: false,
  },
);

function ImageUploader({ className, ...restProps }: ImageUploaderContentProps) {
  const containerClassName = joinClassNames(style.container, className);

  return (
    <div className={containerClassName}>
      <ImageUploaderContent {...restProps} />
    </div>
  );
}

export default memo(ImageUploader, (prevProps, nextProps) => {
  return prevProps.imgValue === nextProps.imgValue;
});
