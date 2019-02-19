import React from 'react';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../LocalizationProvider';
import LocaleTime from '../LocaleTime';

test('Renders a localized time from a string', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleTime date={'2018-07-10T12:38:37.713'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized time from a date', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleTime date={new Date('2018-07-10T12:38:37.713')} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders null if the date is invalid', () => {
  // eslint-disable-next-line no-console
  console.error = jest.fn();

  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleTime date={'abcdefghijklmnopqrstuvwxyz'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalled();
});

test('Renders a localized time with an incorrect locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleTime date={'2018-07-10T12:38:37.713'} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized time with specific format', () => {
  const component = renderer.create(
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

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
