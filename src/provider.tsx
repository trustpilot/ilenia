import React from 'react';

import { LocalizationContext, Translations } from './context';

interface LocalizationProviderProps {
  children: React.ReactNode;
  locale: string;
  translations: Translations;
}

export const LocalizationProvider = ({
  children,
  locale,
  translations,
}: LocalizationProviderProps) => (
  <LocalizationContext.Provider
    value={{
      locale,
      translations,
    }}
  >
    {children}
  </LocalizationContext.Provider>
);
