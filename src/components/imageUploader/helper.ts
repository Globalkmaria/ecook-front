import {
  getArrayAndWithBeVerbMessage,
  getArrayOrMessage,
} from '@/utils/message';

export const getFileInfoMessage = (
  maxSizeKB: number,
  formats: string[],
): string => {
  return `File size should not exceed ${maxSizeKB} KB and format should be  
${getArrayOrMessage(getOnlyFormats(formats))}.`;
};

export const getOnlyFormats = (formats: string[]): string[] =>
  formats.map((type) => type.split('/')[1]);

export const getInvalidFileFormatMessage = (formats: string[]): string => {
  const formattedFormats = getOnlyFormats(formats);

  return `Invalid file format. Only ${getArrayAndWithBeVerbMessage(formattedFormats)} allowed.`;
};
