import React from 'react';
import renderer from 'react-test-renderer';
import { LocalizationProvider, Text } from '../../';

const translations = {
  'test1': 'Just a random string',
  'test2': 'A string but with a {value} in it',
  'test3': 'A string that is sort of <b>bold</b>'
};

const setupText = (string, interpolations) => (<LocalizationProvider locale="en-US" translations={translations}>
  <Text id={string} interpolations={interpolations}/>
</LocalizationProvider>);

test('Renders a plain string', () => {
  const component = renderer.create(setupText('test1'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with an interpolations', () => {
  const component = renderer.create(setupText('test2', { 'value': 'huge value' }));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with HTML in it', () => {
  const component = renderer.create(setupText('test3'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
