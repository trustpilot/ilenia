import React from 'react';
import renderer from 'react-test-renderer';

import LocalizationProvider from '../../localizationProvider';
import NumberText from '../';

test('Renders a localized number with a correct locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="en-US" translations={{}}>
      <NumberText number={1000000} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a localized number with an incorrect locale', () => {
  const component = renderer.create(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <NumberText number={1000000} />
    </LocalizationProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});