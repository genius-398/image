
export enum GenerationMode {
  TEXT_TO_IMAGE = 'TEXT_TO_IMAGE',
  IMAGE_TO_IMAGE = 'IMAGE_TO_IMAGE',
}

export type ImageSize = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface ImageSizeOption {
  label: string;
  value: string;
  aspectRatio: ImageSize;
}
