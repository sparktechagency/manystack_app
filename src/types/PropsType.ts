import { ImageSourcePropType } from 'react-native';

export interface ISingleDropDownProps {
  error: any;
  data: { label: string; value: string }[];
  name: any;
  value: string;
  inputValue: any;
  setInputValue: any;
  setError: any;
  placeholder?: string;
  handler?: (arg0?: any) => void;
}

export interface IImageUploadProps {
  images: any;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  maxNumber?: number;
  children: React.ReactNode;
}
export interface IDrawerLinksProps {
  title: string;
  href: string;
  icon: ImageSourcePropType;
}
