import React from 'react';
import renderer from 'react-test-renderer';
import { LocalizationProvider, HtmlText } from '../../';

const translations = {
  'test1': 'Just a random string',
  'test2': 'A string but with a [HTML] in it',
  'test3': 'A string that is sort of [HTML]italic[HTML] and [HTML]bold[HTML] and such',
  'test4': 'A string that is sort of [HTML]italic[HTML]',
  'test5': 'A string that uses {smtg}another{smtg} key'
};

const setupText = (string, interpolations, key) => (<LocalizationProvider locale="en-US" translations={translations}>
  <HtmlText id={string} interpolations={interpolations} key={key} />
</LocalizationProvider>);

test('Renders a plain string', () => {
  const component = renderer.create(setupText('test1'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with one HTML part', () => {
  const component = renderer.create(setupText('test2', ['<span>hello</span>']));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with multiple HTML parts in it', () => {
  const component = renderer.create(setupText('test3', ['<em>', '</em>', '<b>', '</b>']));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with HTML parts in the end', () => {
  const component = renderer.create(setupText('test4', ['<em>', '</em>']));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with HTML marked with another key', () => {
  const component = renderer.create(setupText('test5', ['<b>', '</b>'], '{smtg}'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
