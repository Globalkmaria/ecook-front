'use client';

import React, {
  useState,
  ChangeEventHandler,
  DragEventHandler,
  useRef,
  memo,
  useEffect,
} from 'react';

import style from './style.module.scss';

import { joinClassNames } from '@/utils/style';

import Icon from '@/components/Icon';

import { getFileInfoMessage, getInvalidFileFormatMessage } from './helper';

const MAX_FILE_SIZE = 500;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

interface Props {
  className?: string;
  maxSizeKB?: number;
  allowedFileTypes?: string[];
  imgValue: File | null;
  onChange: (img: File | null) => void;
}

function ImageUploader({
  className,
  maxSizeKB = MAX_FILE_SIZE,
  allowedFileTypes = ALLOWED_FILE_TYPES,
  imgValue,
  onChange,
}: Props) {
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const src = imgValue ? URL.createObjectURL(imgValue) : undefined;

  const maxSize = maxSizeKB * 1024;
  const containerClassName = joinClassNames(style.container, className);
  const infoMessage = getFileInfoMessage(maxSizeKB, allowedFileTypes);

  const validateAndReadFile = (file: File): void => {
    setError(null);

    if (!allowedFileTypes.includes(file.type)) {
      setError(getInvalidFileFormatMessage(allowedFileTypes));
      return;
    }

    if (file.size > maxSize) {
      setError(`File size exceeds the ${maxSizeKB} KB limit.`);
      return;
    }

    onChange(file);
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndReadFile(file);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndReadFile(file);
  };

  const handleRemoveImage = () => {
    onChange(null);
    setError(null);

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleClick = () => inputRef.current?.click();

  useEffect(() => {
    return () => {
      if (src) {
        URL.revokeObjectURL(src);
      }
    };
  }, [src]);

  return (
    <div className={containerClassName}>
      {!imgValue && (
        <div
          className={style.drag}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={style.message}>
            <span>
              {dragging
                ? 'Drop the image here.'
                : 'Drag and drop an image or click to select.'}
            </span>
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
        onChange={handleImageChange}
      />

      {error && <p className={style.error}>{error}</p>}

      {imgValue && (
        <div className={style.preview}>
          <img src={src} alt='Selected' className={style.img} />
          <button className={style['close-btn']} onClick={handleRemoveImage}>
            <Icon icon='close' />
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(ImageUploader, (prevProps, nextProps) => {
  return prevProps.imgValue === nextProps.imgValue;
});
