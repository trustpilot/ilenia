import React from 'react';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../LocalizationProvider';
import TimeagoText from '../TimeagoText';

test('Renders a localized date from a number', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <TimeagoText date={Date.now() - 11 * 1000 * 60 * 60} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized date from a string', () => {
  const component = renderer.create(
    <LocalizationProvider locale="es-ES" translations={{}}>
      <TimeagoText date={new Date(Date.now() - 11 * 1000 * 60 * 60).toString()} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized date from a date', () => {
  const component = renderer.create(
    <LocalizationProvider locale="fr-FR" translations={{}}>
      <TimeagoText date={new Date(Date.now() - 11 * 1000 * 60 * 60)} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Throw an error if the date is invalid', () => {
  console.error = jest.fn();

  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <TimeagoText date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized date with an incorrect locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <TimeagoText date={new Date(Date.now() - 11 * 1000 * 60 * 60)} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
