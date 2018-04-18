import React from 'react';

const LocalizationContext = React.createContext({
  fallbackTranslations: {},
  locale: 'en-US',
  translations: {},
});

export default LocalizationContext;
