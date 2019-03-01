import React from 'react';
import { render } from 'react-testing-library';

import LocalizationProvider from '../LocalizationProvider';
import LocaleTime from '../LocaleTime';

test('Renders a localized time from a string', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleTime date={'2018-07-10T12:38:37.713'} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized time from a date', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleTime date={new Date('2018-07-10T12:38:37.713')} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders null if the date is invalid', () => {
  // eslint-disable-next-line no-console
  console.error = jest.fn();

  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleTime date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized time with an incorrect locale', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleTime date={'2018-07-10T12:38:37.713'} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized time with specific format', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleTime
        date="2018-07-10T12:38:37.713"
        format={{
          hour: 'numeric',
          minute: 'numeric',
        }}
      />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
