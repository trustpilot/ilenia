import React from 'react';
import PropTypes from 'prop-types';

const withTranslations = (Component) => {
  const wrapper = (props, context) =>
    <Component {...props} translations={context.translations} locale={context.locale}/>;

  wrapper.contextTypes = {
    locale: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  wrapper.displayName = `withTranslations(${Component.displayName || Component.name})`;

  return wrapper;
};

export default withTranslations;
