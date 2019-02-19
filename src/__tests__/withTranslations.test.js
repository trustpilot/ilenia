import React from 'react';
import 'raf/polyfill';
import renderer from 'react-test-renderer';

import withTranslations from '../withTranslations';
import LocalizationProvider from '../LocalizationProvider';

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

test('Wrapped component has access to locale and translations as props', () => {
  const TranslatedChild = withTranslations(Child);

  const component = renderer.create(
    <LocalizationProvider
      locale={locale}
      translations={{ ...fallbackTranslations, ...translations }}
    >
      <TranslatedChild />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
