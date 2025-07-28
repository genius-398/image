
import { ImageSizeOption } from './types';

export const IMAGE_SIZE_OPTIONS: ImageSizeOption[] = [
  { label: 'Square (1024x1024)', value: '1024x1024', aspectRatio: '1:1' },
  { label: 'Widescreen (1344x768)', value: '1344x768', aspectRatio: '16:9' },
  { label: 'Portrait (768x1344)', value: '768x1344', aspectRatio: '9:16' },
  { label: 'Landscape (1152x896)', value: '1152x896', aspectRatio: '4:3' },
  { label: 'Tall (896x1152)', value: '896x1152', aspectRatio: '3:4' },
];
