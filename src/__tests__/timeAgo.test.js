import React from 'react';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../LocalizationProvider';
import TimeAgo from '../TimeAgo';

test('Renders a localized date from a number', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <TimeAgo date={Date.now() - 11 * 1000 * 60 * 60} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized date from a string', () => {
  const component = renderer.create(
    <LocalizationProvider locale="es-ES" translations={{}}>
      <TimeAgo date={new Date(Date.now() - 11 * 1000 * 60 * 60).toString()} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized date from a date', () => {
  const component = renderer.create(
    <LocalizationProvider locale="fr-FR" translations={{}}>
      <TimeAgo date={new Date(Date.now() - 11 * 1000 * 60 * 60)} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Throw an error if the date is invalid', () => {
  //eslint-disable-next-line no-console
  console.error = jest.fn();

  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <TimeAgo date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized date with an incorrect locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <TimeAgo date={new Date(Date.now() - 11 * 1000 * 60 * 60)} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
