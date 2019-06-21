import * as React from 'react';

import { LocalizationContext } from '.';

function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withTranslations = (Component: React.ComponentType) => {
  const WithTranslations = (props: any) => (
    <LocalizationContext.Consumer>
      {(context) => (
        <Component {...props} translations={context.translations} locale={context.locale} />
      )}
    </LocalizationContext.Consumer>
  );

  WithTranslations.displayName = `WithTranslations(${getDisplayName(Component)})`;
  WithTranslations.propTypes = Component.propTypes;
  WithTranslations.defaultProps = Component.defaultProps;
  return WithTranslations;
};
