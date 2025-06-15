import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { Colors, ITheme } from '../constant/colors';
// import { Provider } from 'react-redux';
// import { Colors, ITheme } from '../constant/colors';
// import { store } from '../Redux/store';

interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  setModalOpen: (arg1: boolean) => void;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  modalOpen: boolean;
  height: number;
  width: number;
  english: boolean;
  setEnglish: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextProvider = ({ children }: GlobalProviderProps) => {
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState<string>('');
  const [english, setEnglish] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [images, setImages] = React.useState<string[]>([]);
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
