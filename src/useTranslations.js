import { useContext } from 'react';
import LocalizationContext from './Context';

function useTranslations() {
  const context = useContext(LocalizationContext);
  return [context.translations, context.locale];
}

export default useTranslations;
