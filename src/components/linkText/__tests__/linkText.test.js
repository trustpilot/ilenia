import React from 'react';
import {render, Simulate, wait} from 'react-testing-library';
import renderer from 'react-test-renderer';
import LocalizationProvider from '../../localizationProvider';
import LinkText from '../';

const translations = {
  'test1': 'No links in the string',
  'test2': 'A link [LINK-BEGIN]in the[LINK-END] middle',
  'test3': 'A link [LINK-BEGIN]in the[LINK-END] middle and one [LINK2-BEGIN]in the end[LINK2-END]',
  'test4': 'A link [LINK-BEGIN]in the[LINK-END] middle',
};

const setupLink = (string, links) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <LinkText string={string} links={links} translations={translations}/>
  </LocalizationProvider>
);

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
      href: 'http://something1',
    },
    {
      start: '[LINK2-BEGIN]',
      end: '[LINK2-END]',
      href: 'http://something2',
    }];

  const component = renderer.create(setupLink('test3', links));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with a link with arbitrary attributes', () => {
  const links = [{
    href: 'http://something1',
    target: '_blank',
    class: 'button',
  }];

  const component = renderer.create(setupLink('test4', links));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with a working onClick callback', () => {
  const onClickSpy = jest.fn();

  const links = [{
    href: 'http://something1',
    target: '_blank',
    class: 'button',
    onClick: onClickSpy,
  }];

  const {getByText} = render(setupLink('test4', links));
  Simulate.click(getByText('in the'));
  expect(onClickSpy.mock.calls.length).toBe(1);

  const component = renderer.create(setupLink('test4', links));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders nothing when the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console
  const component = renderer.create(setupLink('not-there'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});
