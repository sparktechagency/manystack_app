import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { Dimensions } from 'react-native';
import { Colors, ITheme } from '../constant/colors';
import { useGetProfileQuery } from '../redux/Apis/userApis';
import { IUserProfile } from '../types/DataTypes';
// import { Provider } from 'react-redux';
// import { Colors, ITheme } from '../constant/colors';
// import { store } from '../Redux/store';
export interface IImage {
  uri: string;
  name: string;
  type: string;
  mimeType: string;
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
  user: IUserProfile | null;
  userLoading: boolean;
  showSubscription: boolean;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSubscription: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextProvider = ({ children }: GlobalProviderProps) => {

  const {
    data,
    isLoading: userLoading,
    isFetching,
  } = useGetProfileQuery(undefined);
  const { width, height } = Dimensions.get('window');
  const [search, setSearch] = useState<string>('');
  const [english, setEnglish] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [images, setImages] = React.useState<IImage[] | []>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [showSubscription, setShowSubscription] = useState<boolean>(true);
  const [currency, setCurrency] = useState<string>('$');
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
    userLoading: userLoading || isFetching,
    showSubscription,
    currency,
    setCurrency,
    firstLoad,
    setFirstLoad,
    setShowSubscription
  };

  useEffect(() => {
    if (data?.data) {
      setCurrency(data?.data?.currency);
    }
  }, [data]);

  return (
    <GlobalContext.Provider value={values}>
      {children}
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
