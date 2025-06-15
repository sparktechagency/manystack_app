import {TranslationKey, translations} from '../constant/translations';

export const t = (key: TranslationKey, english: boolean = true): string => {
  const entry = translations[key];
  return english ? entry.en : entry.fr;
};
