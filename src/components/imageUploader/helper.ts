import {
  getArrayAndWithBeVerbMessage,
  getArrayOrMessage,
} from '@/utils/message';

// Helper function to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

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

// New type that holds both URL for display and File for submission
export interface ImageWithUrl {
  url: string;
  file: File;
  isOptimized?: boolean;
}

export type ImageFileType = File | string | ImageWithUrl | null;

export const optimizeImageFile = async (
  file: File,
  maxSizeMB?: number,
  maxWidthOrHeight?: number,
): Promise<ImageWithUrl> => {
  // Guard against server-side execution
  if (!isBrowser) {
    throw new Error('Image optimization is only available in the browser');
  }

  let formattedFile = file;

  try {
    // Convert HEIC files to WebP
    if (file.type === 'image/heic') {
      const heic2any = (await import('heic2any')).default;
      const blob = await heic2any({
        blob: file,
        toType: 'image/webp',
        quality: 0.8,
      });

      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove original extension
      formattedFile = new File([blob as Blob], `${fileName}.webp`, {
        type: 'image/webp',
      });
    }

    const imageCompression = (await import('browser-image-compression'))
      .default;
    formattedFile = await imageCompression(formattedFile, {
      maxSizeMB: maxSizeMB || 0.3,
      maxWidthOrHeight: maxWidthOrHeight || 500,
      useWebWorker: true,
      fileType: 'image/webp',
    });

    // Return both the optimized file and a URL for display
    return {
      url: await fileToDataUrl(formattedFile),
      file: formattedFile,
      isOptimized: true,
    };
  } catch (error) {
    console.error('Error optimizing image:', error);
    return {
      url: isBrowser ? URL.createObjectURL(file) : '',
      file: file,
      isOptimized: false,
    };
  }
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error('FileReader is only available in the browser'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper function to get File object from ImageFileType for form submission
export const getFileFromImageValue = (imgValue: ImageFileType): File | null => {
  if (!imgValue) return null;

  if (imgValue instanceof File) {
    return imgValue;
  }

  if (typeof imgValue === 'object' && 'file' in imgValue) {
    return imgValue.file;
  }

  return null; // String URLs don't have File objects
};

// Helper function to get URL from ImageFileType for display
export const getUrlFromImageValue = (
  imgValue: ImageFileType,
): string | null => {
  if (!imgValue) return null;

  if (typeof imgValue === 'string') {
    return imgValue;
  }

  if (typeof imgValue === 'object' && 'url' in imgValue) {
    return imgValue.url;
  }

  if (imgValue instanceof File) {
    return isBrowser ? URL.createObjectURL(imgValue) : '';
  }

  return null;
};

// Cleanup function for blob URLs
export const cleanupImageUrl = (imgValue: ImageFileType): void => {
  if (!isBrowser) return;

  if (
    typeof imgValue === 'object' &&
    imgValue &&
    'url' in imgValue &&
    imgValue.url.startsWith('blob:')
  ) {
    URL.revokeObjectURL(imgValue.url);
  }
};
