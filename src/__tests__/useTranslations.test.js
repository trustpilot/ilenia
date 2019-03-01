import React from 'react';
import { render } from 'react-testing-library';
import { LocalizationProvider, useTranslations } from '../';

const TestComponent = () => {
  const [translations, locale] = useTranslations();
  return `${translations.test}: ${locale}`;
};

test('A component using the hook prints the right values', () => {
  const { container } = render(
    <LocalizationProvider
      locale={'da-DK'}
      translations={{
        test: 'Language',
      }}
    >
      <TestComponent />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
