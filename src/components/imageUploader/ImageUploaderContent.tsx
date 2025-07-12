'use client';

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  memo,
  useTransition,
} from 'react';

import { joinClassNames } from '@/utils/style';

import Icon from '@/components/Icon';

import {
  getFileInfoMessage,
  ImageFileType,
  optimizeImageFile,
  getInvalidFileFormatMessage,
  getUrlFromImageValue,
  cleanupImageUrl,
} from './helper';
import style from './style.module.scss';

const MAX_FILE_SIZE = 20;
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
];

export interface ImageUploaderContentProps {
  className?: string;
  maxSizeMB?: number;
  allowedFileTypes?: string[];
  imgValue: ImageFileType;
  initialImg?: string | null;
  onChange: (img: ImageFileType) => void;
  mode?: 'edit' | 'new';
  optimizeImageOptions?: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
  };
}

function ImageUploaderContent({
  className,
  maxSizeMB = MAX_FILE_SIZE,
  allowedFileTypes = ALLOWED_FILE_TYPES,
  imgValue,
  onChange,
  initialImg = null,
  mode = 'edit',
  optimizeImageOptions,
}: ImageUploaderContentProps) {
  const [isLoading, startTransition] = useTransition();
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const src = getUrlFromImageValue(imgValue);
  const maxSize = maxSizeMB * 1024 * 1024;
  const containerClassName = joinClassNames(style.container, className);
  const infoMessage = getFileInfoMessage(maxSizeMB, allowedFileTypes);

  const mainMessage = isLoading
    ? 'Loading...'
    : dragging
      ? 'Drop the image here.'
      : 'Drag and drop an image or click to select.';

  const validateAndReadFile = async (file: File): Promise<void> => {
    setError(null);

    if (!allowedFileTypes.includes(file.type)) {
      setError(getInvalidFileFormatMessage(allowedFileTypes));
      return;
    }

    if (file.size > maxSize) {
      setError(`File size exceeds the ${maxSizeMB} MB limit.`);
      return;
    }

    startTransition(async () => {
      try {
        const optimizedImage = await optimizeImageFile(
          file,
          optimizeImageOptions?.maxSizeMB,
          optimizeImageOptions?.maxWidthOrHeight,
        );
        onChange(optimizedImage);
      } catch (error) {
        setError('Failed to optimize image. Please try again.');
        console.error('Image optimization failed:', error);
      }
    });
  };

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndReadFile(file);
    },
    [],
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndReadFile(file);
  }, []);

  const onRemoveImage = useCallback(() => {
    cleanupImageUrl(imgValue);
    onChange(null);
    setError(null);

    if (inputRef.current) inputRef.current.value = '';
  }, [imgValue, onChange]);

  const onClick = useCallback(() => inputRef.current?.click(), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    },
    [onClick],
  );

  const onReset = useCallback(() => {
    onChange(initialImg);
  }, [initialImg, onChange]);

  useEffect(() => {
    return () => {
      cleanupImageUrl(imgValue);
    };
  }, [imgValue]);

  return (
    <div className={containerClassName}>
      {!imgValue && (
        <div
          className={style.drag}
          onClick={onClick}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          role='button'
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label='Upload image'
        >
          <div className={style.message}>
            <span>{mainMessage}</span>
            <span>{infoMessage}</span>
          </div>
        </div>
      )}
      <input
        className={style.input}
        ref={inputRef}
        type='file'
        id='image-input'
        accept={allowedFileTypes.join(', ')}
        onChange={onImageChange}
      />
      {mode === 'edit' && (
        <EditCloseButton
          imgValue={imgValue}
          src={src}
          onRemoveImage={onRemoveImage}
          onReset={onReset}
        />
      )}
      {mode === 'new' && (
        <NewCloseButton
          imgValue={imgValue}
          src={src}
          onRemoveImage={onRemoveImage}
        />
      )}

      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}

type ButtonProps = {
  onRemoveImage: () => void;
  onReset: () => void;
  src: string | null;
} & Pick<ImageUploaderContentProps, 'imgValue'>;

type NewCloseButtonProps = Omit<ButtonProps, 'onReset'>;

function NewCloseButton({ imgValue, src, onRemoveImage }: NewCloseButtonProps) {
  if (!imgValue) return null;

  return (
    <div className={style.preview}>
      <img src={src || ''} alt='Selected' className={style.img} />
      <button className={style['close-btn']} onClick={onRemoveImage}>
        <Icon icon='close' />
      </button>
    </div>
  );
}

function EditCloseButton({
  imgValue,
  src,
  onRemoveImage,
  onReset,
}: ButtonProps) {
  return (
    <>
      {imgValue ? (
        <div className={style.preview}>
          <img src={src || ''} alt='Selected' className={style.img} />
          <button className={style['close-btn']} onClick={onRemoveImage}>
            <Icon icon='close' />
          </button>
        </div>
      ) : (
        <div className={style.reset}>
          <button
            className={style['close-btn']}
            onClick={onReset}
            title='reset image'
          >
            <Icon icon='reset' />
          </button>
        </div>
      )}
    </>
  );
}

export default memo(ImageUploaderContent, (prevProps, nextProps) => {
  return prevProps.imgValue === nextProps.imgValue;
});
