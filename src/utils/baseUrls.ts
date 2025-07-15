// export const baseUrl = 'http://10.0.60.70:5000';
export const baseUrl = 'http://13.39.251.121';

export const generateImageUrl = (imagePath: string): string =>
  imagePath?.includes('http')
    ? imagePath
    : imagePath?.startsWith('/')
      ? `${baseUrl}${imagePath}`
      : `${baseUrl}/${imagePath}`;
