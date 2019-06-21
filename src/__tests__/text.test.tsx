import React from 'react';
import { render } from '@testing-library/react';

import { LocalizationProvider, Text } from '..';
import { Interpolations, Tag } from '../text';

const translations = {
  test1: 'Just a random string',
  test2: 'A string but with a [value] in it',
  test3: 'A string that uses another {{placeholder}}',
};

const setupText = (string: string, interpolations?: Interpolations, tag?: Tag) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <Text id={string} interpolations={interpolations} tag={tag} />
  </LocalizationProvider>
);

test('Renders a plain string', () => {
  const { container } = render(setupText('test1'));

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a string with an interpolations', () => {
  const { container } = render(setupText('test2', { value: 'huge value' }));

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a string which uses a different placeholder syntax', () => {
  const { container } = render(
    setupText('test3', { placeholder: 'syntax' }, { start: '{{', end: '}}' })
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders components if included as interpolations', () => {
  const { container } = render(
    setupText('test2', { value: <strong key="strong">huge value</strong> })
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders nothing if the string is not there', () => {
  console.error = jest.fn();

  const { container } = render(setupText('test4'));

  expect(container.firstChild).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled();
});
