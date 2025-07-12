import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

import {
  getArrayAndWithBeVerbMessage,
  getArrayOrMessage,
} from '@/utils/message';

export const getFileInfoMessage = (
  maxSizeMB: number,
  formats: string[],
): string => {
  return `File size should not exceed ${maxSizeMB} MB and format should be  
${getArrayOrMessage(getOnlyFormats(formats))}.`;
};

export const getOnlyFormats = (formats: string[]): string[] =>
  formats.map((type) => type.split('/')[1]);

export const getInvalidFileFormatMessage = (formats: string[]): string => {
  const formattedFormats = getOnlyFormats(formats);

  return `Invalid file format. Only ${getArrayAndWithBeVerbMessage(formattedFormats)} allowed.`;
};

export const optimizeImageFile = async (
  file: File,
  maxSizeMB: number = 0.3,
  maxWidthOrHeight: number = 500,
): Promise<File> => {
  let formattedFile = file;

  try {
    if (file.type === 'image/heic') {
      const blob = await heic2any({
        blob: file,
        toType: 'image/webp',
        quality: 0.8,
      });

      const fileName = file.name.replace(/\.[^/.]+$/, '');
      formattedFile = new File([blob as Blob], `${fileName}.webp`, {
        type: 'image/webp',
      });
    }

    formattedFile = await imageCompression(formattedFile, {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      fileType: 'image/webp',
    });

    if (!formattedFile.name.endsWith('.webp')) {
      const fileName = formattedFile.name.replace(/\.[^/.]+$/, '');
      formattedFile = new File([formattedFile], `${fileName}.webp`, {
        type: 'image/webp',
      });
    }
  } catch (err) {
    console.error(err);
    alert('Error converting image to WebP format');
  }

  return formattedFile;
};
