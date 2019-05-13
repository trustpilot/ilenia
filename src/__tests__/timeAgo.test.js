import React from 'react';
import { render } from 'react-testing-library';

import LocalizationProvider from '../LocalizationProvider';
import TimeAgo from '../TimeAgo';

test('Renders a localized date from a number', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <TimeAgo date={Date.now() - 11 * 1000 * 60 * 60} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized date from a string', () => {
  const { container } = render(
    <LocalizationProvider locale="es-ES" translations={{}}>
      <TimeAgo date={new Date(Date.now() - 11 * 1000 * 60 * 60).toString()} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized date from a date', () => {
  const { container } = render(
    <LocalizationProvider locale="fr-FR" translations={{}}>
      <TimeAgo date={new Date(Date.now() - 11 * 1000 * 60 * 60)} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Throw an error if the date is invalid', () => {
  //eslint-disable-next-line no-console
  console.error = jest.fn();

  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <TimeAgo date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
  //eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized date with an incorrect locale', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <TimeAgo date={new Date(Date.now() - 11 * 1000 * 60 * 60)} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
