import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider, useTranslations } from '..';

const TestComponent = () => {
  const [translations, locale] = useTranslations();
  return <React.Fragment>{`${translations.test}: ${locale}`}</React.Fragment>;
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
