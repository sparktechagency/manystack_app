import {ICreateInterVention} from './DataTypes';
import {ICreateInterVentionError} from './ErrorTypes';

export interface ISingleDropDownProps {
  error: ICreateInterVentionError;
  data: {label: string; value: string}[];
  name: keyof ICreateInterVention;
  value: string;
  inputValue: ICreateInterVention;
  setInputValue: React.Dispatch<React.SetStateAction<ICreateInterVention>>;
  setError: React.Dispatch<React.SetStateAction<ICreateInterVentionError>>;
}

export interface IImageUploadProps {
  images: any;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  maxNumber: number;
  children: React.ReactNode;
}
