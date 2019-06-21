import React from 'react';
import { render } from '@testing-library/react';

import { LocalizationProvider, LocaleNumber } from '..';

test('Renders a localized number with a correct locale', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={1000000} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders a localized number with an incorrect locale', () => {
  const { container } = render(
    <LocalizationProvider locale="abcdefghijklmnopqrstuvwxyz" translations={{}}>
      <LocaleNumber number={1000000} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders truncated and localized number when max decimal is set', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={9.392} maxDecimals={2} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders non decimal number when max decimal is set to zero', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={13.2452} maxDecimals={0} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Renders only none zero decimals when maxDecimals is set', () => {
  const { container } = render(
    <LocalizationProvider locale="en-US" translations={{}}>
      <LocaleNumber number={3.2} maxDecimals={2} />
    </LocalizationProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
