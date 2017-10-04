import React from 'react';
import renderer from 'react-test-renderer';
import { LocalizationProvider, LinkString } from '../';

const translations = {
  'test1': 'No links in the string',
  'test2': 'A link [LINK-BEGIN]in the[LINK-END] middle',
  'test3': 'A link [LINK-BEGIN]in the[LINK-END] middle and one [LINK2-BEGIN]in the end[LINK2-END]'
};

const setupLink = (string, links) => (<LocalizationProvider locale="en-US" translations={translations}>
  <LinkString string={string} links={links}></LinkString>
</LocalizationProvider>);

test('Renders a string with no links in it', () => {
  const component = renderer.create(setupLink('test1', []));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with one link in the middle', () => {
  const component = renderer.create(setupLink('test2', [{ href: 'http://something' }]));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with multiple links in it', () => {
  const links = [
    {
      href: 'http://something1'
    },
    {
      start: '[LINK2-BEGIN]',
      end: '[LINK2-END]',
      href: 'http://something2'
    }];

  const component = renderer.create(setupLink('test3', links));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
