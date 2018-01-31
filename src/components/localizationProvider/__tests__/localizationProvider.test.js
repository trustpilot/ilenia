import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import LocalizationProvider from '../';

const locale = 'da-DK';

const translations = {
  myString: 'Dansk',
};

const fallbackTranslations = {
  myString: 'English (US)',
};

class Child extends Component {
  render() {
    return <div/>;
  }

  shouldComponentUpdate() {
    return false;
  }

  static contextTypes = {
    locale: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }
}

test('Provider merges translations and fallback translations correctly', () => {

  const component = TestUtils.renderIntoDocument(
    <LocalizationProvider locale={locale} translations={translations} fallbackTranslations={fallbackTranslations}>
      <Child/>
    </LocalizationProvider>);

  const child = TestUtils.findRenderedComponentWithType(component, Child);
  expect(child.context.translations.myString).toBe('Dansk');
});
