import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { Colors } from '../constant/colors';
// import { Provider } from 'react-redux';
// import { Colors, ITheme } from '../constant/colors';
// import { store } from '../Redux/store';

interface GlobalContextType {
  // themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  setModalOpen: (arg1: boolean) => void;
  modalOpen: boolean;
  height: number;
  width: number;
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextProvider = ({ children }: GlobalProviderProps) => {
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const themeColors = Colors.light;
  const values = {
    themeColors,
    setSearch,
    search,
    setModalOpen,
    modalOpen,
    width,
    height,
  };
  console.log(values)
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
