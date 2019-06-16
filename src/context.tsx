import * as React from 'react';

export interface Translations {
  [keyof: string]: string;
}

export interface Context {
  locale: string;
  translations: Translations;
}

export const LocalizationContext = React.createContext<Context>({
  locale: 'en-US',
  translations: {},
});
