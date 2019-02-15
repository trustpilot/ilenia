import React from 'react';

import LocalizationContext from './Context';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withTranslations = (Component) => {
  const WithTranslations = (props) => (
    <LocalizationContext.Consumer>
      {(context) => <Component {...props} translations={context.translations} locale={context.locale} />}
    </LocalizationContext.Consumer>
  );

  WithTranslations.displayName = `WithTranslations(${getDisplayName(Component)})`;
  WithTranslations.propTypes = Component.propTypes;
  WithTranslations.defaultProps = Component.defaultProps;
  return WithTranslations;
};

export default withTranslations;
