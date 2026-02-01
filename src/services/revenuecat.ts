import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

export const initRevenueCat = async () => {
  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

  await Purchases.configure({
    apiKey:
      Platform.OS === 'ios'
        ? 'appl_tHakSyAztiXzbzeqtARsyrRdgpp'
        : 'goog_yTkIkCOSSUxCAjntXwSjguTpAWP',
  });
};
