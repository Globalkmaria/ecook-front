'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

const CustomImage = ({ src, fallbackSrc, alt, ...props }: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      {...props}
      onError={() => setImgSrc(fallbackSrc ?? '/img/default.jpg')}
    />
  );
};

export default CustomImage;
