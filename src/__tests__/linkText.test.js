import React from 'react';
import 'raf/polyfill';
import { render, Simulate } from 'react-testing-library';
import LocalizationProvider from '../LocalizationProvider';
import LinkText from '../LinkText';

const translations = {
  test1: 'No links in the string',
  test2: 'A link [LINK-BEGIN]in the[LINK-END] middle',
  test3: 'A link [LINK-BEGIN]in the[LINK-END] middle and one [LINK2-BEGIN]in the end[LINK2-END]',
  test4: 'A link [LINK-BEGIN]in the[LINK-END] middle',
};

const setupLink = (string, links) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <LinkText id={string} links={links} translations={translations} />
  </LocalizationProvider>
);

test('Renders a string with no links in it', () => {
  const { container } = render(setupLink('test1', []));
  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a string with one link in the middle', () => {
  const { container } = render(setupLink('test2', [{ href: 'http://something' }]));
  expect(container.firstChild).toMatchSnapshot();
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
    },
  ];

  const { container } = render(setupLink('test3', links));
  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a string with a link with arbitrary attributes', () => {
  const links = [
    {
      href: 'http://something1',
      target: '_blank',
      class: 'button',
    },
  ];

  const { container } = render(setupLink('test4', links));
  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a string with a working onClick callback', () => {
  // console.error node_modules/fbjs/lib/warning.js:33
  // Warning: Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.

  const onClickSpy = jest.fn();

  const links = [
    {
      href: 'http://something1',
      target: '_blank',
      class: 'button',
      onClick: onClickSpy,
    },
  ];

  const { getByText, container } = render(setupLink('test4', links));
  Simulate.click(getByText('in the'));
  expect(onClickSpy.mock.calls.length).toBe(1);

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders nothing when the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console
  const { container } = render(setupLink('not-there'));

  expect(container.firstChild).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});
