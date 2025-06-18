import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { IImage } from '../providers/GlobalContextProvider';
import { ISubscription } from './DataTypes';

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
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  maxNumber?: number;
  children: React.ReactNode;
}
export interface IDrawerLinksProps {
  title: string;
  href: string;
  icon: ImageSourcePropType;
  showArrow?: boolean;
}
export interface ISubscriptionProps {
  item: ISubscription;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
export interface ICategoryListItem {
  title: string;
  price: string;
  id: string;
}
