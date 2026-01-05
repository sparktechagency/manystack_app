// export const baseUrl = 'http://10.10.20.52:5000';
export const baseUrl = 'https://api.fibrepro.tech';


export const generateImageUrl = (imagePath: string): string =>
  imagePath?.includes('http')
    ? imagePath
    : imagePath?.startsWith('/')
      ? `${baseUrl}${imagePath}`
      : `${baseUrl}/${imagePath}`;

