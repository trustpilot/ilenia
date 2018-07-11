import React from 'react';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../LocalizationProvider';
import DateText from '../DateText';

test('Renders a localized date from a number', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <DateText date={0} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized date from a string', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <DateText date={'01 Jan 1970 00:00:00 GMT'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized date from a date', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <DateText date={new Date(0)} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders null if the date is invalid', () => {
  console.error = jest.fn();

  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <DateText date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized date with an incorrect locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <DateText date={0} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('REnders a localized date from UTC date string', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <DateText date="2018-07-10T12:38:37.713Z" />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
