import React from 'react';
import { render } from '@testing-library/react';

import { LocalizationProvider, LocalizationContext } from '..';

const locale = 'da-DK';

const translations = {
  myString: 'Dansk',
};

const fallbackTranslations = {
  myString: 'English (US)',
};

const Child = (props: any) => (
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
