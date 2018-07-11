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
  return WithTranslations;
};

export default withTranslations;
