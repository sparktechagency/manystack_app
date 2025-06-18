import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { Colors, ITheme } from '../constant/colors';
import { useGetProfileQuery } from '../redux/Apis/userApis';
import { IUserProfile } from '../types/DataTypes';
// import { Provider } from 'react-redux';
// import { Colors, ITheme } from '../constant/colors';
// import { store } from '../Redux/store';
export interface IImage {
  path: string,
  name: string,
  type: string,
  mimeType: string,
}
interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  setModalOpen: (arg1: boolean) => void;
  images: IImage[] | [];
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  modalOpen: boolean;
  height: number;
  width: number;
  english: boolean;
  setEnglish: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUserProfile | null
  userLoading: boolean
  firstLoad: boolean
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextProvider = ({ children }: GlobalProviderProps) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const { data, isLoading: userLoading } = useGetProfileQuery(undefined)
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState<string>('');
  const [english, setEnglish] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [images, setImages] = React.useState<IImage[] | []>([]);
  const themeColors = Colors.light;
  const values = {
    themeColors,
    setSearch,
    search,
    setModalOpen,
    modalOpen,
    width,
    height,
    images,
    setImages,
    english,
    setEnglish,
    user: data?.data,
    userLoading
    , firstLoad, setFirstLoad
  };
  return (
    <GlobalContext.Provider value={values}>
      {/* <Provider store={store}> */}
      {children}
      {/* </Provider> */}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  return context;
};
export default GlobalContextProvider;
