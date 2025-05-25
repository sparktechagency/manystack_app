import { ICreateInterVention } from './DataTypes';

export interface ISingleDropDownProps {
  error: any;
  data: { label: string; value: string }[];
  name: keyof ICreateInterVention;
  value: string;
  inputValue: ICreateInterVention;
  setInputValue: any;
  setError: any;
}

export interface IImageUploadProps {
  images: any;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  maxNumber: number;
  children: React.ReactNode;
}
