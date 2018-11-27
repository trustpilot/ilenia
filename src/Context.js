import React from 'react';

const LocalizationContext = React.createContext({
  locale: 'en-US',
  translations: {},
});

export default LocalizationContext;
