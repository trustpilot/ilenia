import React from 'react';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../LocalizationProvider';
import LocaleNumber from '../LocaleNumber';

test('Renders a localized number with a correct locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={1000000} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized number with an incorrect locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleNumber number={1000000} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders truncated and localized number when max decimal is set', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={9.392} maxDecimals={2} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders non decimal number when max decimal is set to zero', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={13.2452} maxDecimals={0} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders only none zero decimals when maxDecimals is set', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={3.2} maxDecimals={2} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
