import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

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

export const optimizeImageFile = async (file: File): Promise<File> => {
  let formattedFile = file;

  try {
    if (file.type === 'image/heic') {
      const blob = await heic2any({
        blob: file,
        toType: 'image/png',
        quality: 0.8,
      });

      formattedFile = new File([blob as Blob], `${file.name}.png`, {
        type: 'image/png',
      });
    }

    if (formattedFile.size > 1024 * 600) {
      formattedFile = await imageCompression(formattedFile, {
        maxSizeMB: 0.6, // Limit file size in MB
        maxWidthOrHeight: 700, // Limit max width/height
        useWebWorker: true, // Optional: faster compression
      });
    }
  } catch (err) {
    alert('Error converting HEIC/HEIF image to JPEG');
  }

  return formattedFile;
};
