import React from 'react';
import 'raf/polyfill';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../';
import LocalizationContext from '../../Context';

const locale = 'da-DK';

const translations = {
  myString: 'Dansk',
};

const fallbackTranslations = {
  myString: 'English (US)',
};

const Child = (props) => (
  <div>
    <span>{JSON.stringify(props.translations)}</span>
    <span>{props.locale}</span>
  </div>
);

test('Provider merges translations and fallback translations correctly', () => {
  const component = renderer.create(
    <LocalizationProvider locale={locale} translations={translations} fallbackTranslations={fallbackTranslations}>
      <LocalizationContext.Consumer>
        {(context) => <Child translations={context.translations} locale={context.locale} />}
      </LocalizationContext.Consumer>
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
