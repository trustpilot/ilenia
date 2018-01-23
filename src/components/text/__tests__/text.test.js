import React from 'react';
import renderer from 'react-test-renderer';
import LocalizationProvider from '../../provider';
import Text from '../';

const translations = {
  'test1': 'Just a random string',
  'test2': 'A string but with a {value} in it',
  'test3': 'A string that uses another [placeholder]',
};

const setupText = (string, interpolations, tag) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <Text id={string} interpolations={interpolations} tag={tag} translations={translations}/>
  </LocalizationProvider>
);

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

test('Renders a string which uses a different placeholder syntax', () => {
  const component = renderer.create(setupText('test3', { 'placeholder': 'syntax'}, {start: '[', end: ']'}));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders nothing if the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console

  const component = renderer.create(setupText('test4'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});
