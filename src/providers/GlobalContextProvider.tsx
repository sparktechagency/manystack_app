import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
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
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextProvider = ({ children }: GlobalProviderProps) => {

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
