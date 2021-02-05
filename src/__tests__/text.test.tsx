import React from 'react';
import { render } from '@testing-library/react';

import { LocalizationProvider, Text } from '..';
import { Interpolations, Tag, Suffix } from '../text';

const translations = {
  test1: 'Just a random string',
  test2: 'A string but with a [value] in it',
  test3: 'A string that uses another {{placeholder}}',
  test4: 'A string with a pair of [tag-begin]tags[tag-end] in it',
  test5: 'A string with a pair of [tag-begin][special] tags[tag-end] in it',
  test6: 'A string with [bold-begin]a pair[bold-end] of [tag-begin]tags[tag-end] in it',
  test7: 'A string with a pair of {TAG_START}tags{TAG_END} in it',
};

const setupText = (string: string, interpolations?: Interpolations, tag?: Tag, suffix?: Suffix) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <Text id={string} interpolations={interpolations} tag={tag} suffix={suffix}/>
  </LocalizationProvider>
);

test('Renders a plain string', () => {
  const { container } = render(setupText('test1'));

  expect(container.firstChild).toMatchSnapshot();
});


test('Renders a string which uses a different placeholder syntax', () => {
  const { container } = render(
  setupText('test3', { placeholder: 'syntax' }, { start: '{{', end: '}}' })
  );
  
  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a string with an interpolations', () => {
  const { container } = render(setupText('test2', { value: 'huge value' }));

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders components if included as interpolations', () => {
  const { asFragment } = render(
    setupText('test2', { value: <strong key="strong">strong value</strong> })
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders components if inclded as interpolations pair', () => {
  const { asFragment } = render(
    setupText('test4', { tag: (m) => <b key="bold">{m}</b>})
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders components with an interpolation inside', () => {
  const { asFragment } = render(
    setupText('test5', { tag: (m) => <b key="bold">{m}</b>, special: 'sPeCiAl' })
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders components with two pairs of interpolation', () => {
  const { asFragment } = render(
    setupText('test6', { tag: (m) => <i key="emphasis">{m}</i>, bold: (m) => <b key="bold">{m}</b> })
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders components if inclded as interpolations pair -- custom suffixes and tags', () => {
  const { asFragment } = render(
    setupText(
      'test7',
      { TAG: (m) => <b key="custom_bold">{m}</b> },
      { start: '{', end: '}'},
      { begin: '_START', end: '_END' },
    )
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders nothing if the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console

  const { container } = render(setupText('no-text'));

  expect(container.firstChild).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});