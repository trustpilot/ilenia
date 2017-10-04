import React from 'react';
import PropTypes from 'prop-types';

const withTranslations = (WrappedComponent) => {
  const contextConsumer = (props, context) =>
    <WrappedComponent {...props} translations={context.translations} locale={context.locale}/>;

  contextConsumer.contextTypes = {
    locale: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired
  };

  return contextConsumer;
};

export default withTranslations;
