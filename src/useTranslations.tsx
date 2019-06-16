import { useContext } from 'react';
import { LocalizationContext, Translations } from './context';

export function useTranslations(): [Translations, string] {
  const context = useContext(LocalizationContext);
  return [context.translations, context.locale];
}
