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
import Icon from '../Icon';
import { joinClassNames } from '@/utils/style';
import { getFileInfoMessage, getInvalidFileFormatMessage } from './helper';

const MAX_FILE_SIZE = 500;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

interface Props {
  className?: string;
  maxSizeKB?: number;
  allowedFileTypes?: string[];
  imgValue?: File | string | null;
  initialImg?: string | null;
  onChange: (img: File | string | null) => void;
}

function ImageUploader2({
  className,
  maxSizeKB = MAX_FILE_SIZE,
  allowedFileTypes = ALLOWED_FILE_TYPES,
  imgValue,
  onChange,
  initialImg = null,
}: Props) {
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const src = imgValue
    ? typeof imgValue === 'string'
      ? imgValue
      : URL.createObjectURL(imgValue)
    : undefined;

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

  const onImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndReadFile(file);
  };

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndReadFile(file);
  };

  const onRemoveImage = () => {
    onChange(null);
    setError(null);

    if (inputRef.current) inputRef.current.value = '';
  };

  const onClick = () => inputRef.current?.click();

  const onReset = () => {
    onChange(initialImg);
  };

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
          onClick={onClick}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
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
        onChange={onImageChange}
      />

      {error && <p className={style.error}>{error}</p>}

      {imgValue ? (
        <div className={style.preview}>
          <img src={src} alt='Selected' className={style.img} />
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
    </div>
  );
}

export default memo(ImageUploader2, (prevProps, nextProps) => {
  return prevProps.imgValue === nextProps.imgValue;
});
