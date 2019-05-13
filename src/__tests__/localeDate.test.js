import React from 'react';
import { render } from 'react-testing-library';
import LocalizationProvider from '../LocalizationProvider';
import LocaleDate from '../LocaleDate';

test('Renders a localized date from a number', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleDate date={0} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized date from a string', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleDate date={'01 Jan 1970 00:00:00 GMT'} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized date from a date', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleDate date={new Date(0)} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders null if the date is invalid', () => {
  // eslint-disable-next-line no-console
  console.error = jest.fn();

  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleDate date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized date with an incorrect locale', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleDate date={0} />
    </LocalizationProvider>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized date from UTC date string', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleDate date="2018-07-10T12:38:37.713Z" />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized date with specific format', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleDate
        date="2018-07-10T12:38:37.713Z"
        format={{
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }}
      />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
