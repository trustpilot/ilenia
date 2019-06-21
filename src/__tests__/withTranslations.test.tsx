import React from 'react';
import { render } from '@testing-library/react';

import { LocalizationProvider, withTranslations } from '..';

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

test('Wrapped component has access to locale and translations as props', () => {
  const TranslatedChild = withTranslations(Child);

  const { container } = render(
    <LocalizationProvider
      locale={locale}
      translations={{ ...fallbackTranslations, ...translations }}
    >
      <TranslatedChild />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
