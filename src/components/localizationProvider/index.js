import React from 'react';
import PropTypes from 'prop-types';

import LocalizationContext from '../Context';

const LocalizationProvider = ({children, fallbackTranslations, locale, translations}) => (
  <LocalizationContext.Provider
    value={{
      locale,
      translations: {...fallbackTranslations, ...translations},
    }} >
    {children}
  </LocalizationContext.Provider>
);

LocalizationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  locale: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fallbackTranslations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default LocalizationProvider;
