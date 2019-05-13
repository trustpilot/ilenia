import React from 'react';
import 'raf/polyfill';
import { render } from 'react-testing-library';

import LocalizationProvider from '../LocalizationProvider';
import LocalizationContext from '../Context';

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
  const { container } = render(
    <LocalizationProvider
      locale={locale}
      translations={{ ...fallbackTranslations, ...translations }}
    >
      <LocalizationContext.Consumer>
        {(context) => <Child translations={context.translations} locale={context.locale} />}
      </LocalizationContext.Consumer>
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
