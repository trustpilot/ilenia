import React from 'react';

import LocalizationContext from './Context';

const withTranslations = (Component) => (props) => (
  <LocalizationContext.Consumer>
    {(context) => <Component {...props} translations={context.translations} locale={context.locale} />}
  </LocalizationContext.Consumer>
);

export default withTranslations;
