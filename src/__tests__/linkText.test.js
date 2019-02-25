import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import LocalizationProvider from '../LocalizationProvider';
import LinkText from '../LinkText';

const translations = {
  test1: 'No links in the string',
  test2: 'A link [LINK-BEGIN]in the[LINK-END] middle',
  test3: 'A link [LINK-BEGIN]in the[LINK-END] middle and one [LINK2-BEGIN]in the end[LINK2-END]',
  test4: 'A link [LINK-BEGIN]in the[LINK-END] middle',
  test5: 'A link [LINK-BEGIN]in the[LINK-END] middle and a date: [fromDate]',
};

test('Renders a string with no links in it', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test1" links={[]} translations={translations} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with one link in the middle', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test2" links={[{ href: 'http://something' }]} translations={translations} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
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

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test3" links={links} translations={translations} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with a link with arbitrary attributes', () => {
  const links = [
    {
      href: 'http://something1',
      target: '_blank',
      class: 'button',
    },
  ];

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test4" links={links} translations={translations} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with a working onClick callback', () => {
  const onClickSpy = jest.fn();

  const links = [
    {
      href: 'http://something1',
      target: '_blank',
      class: 'button',
      onClick: onClickSpy,
    },
  ];

  const { getByText, asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test4" links={links} translations={translations} />
    </LocalizationProvider>
  );

  fireEvent.click(getByText(/in the/i));

  expect(onClickSpy).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchSnapshot();
});

test('Renders nothing when the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="not-there" translations={translations} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});

test('Renders a string with a links and an interpolated value', () => {
  const links = [
    {
      href: 'http://something1',
    },
  ];

  const interpolations = {
    fromDate: 'from date',
  };

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText
        id="test5"
        links={links}
        translations={translations}
        interpolations={interpolations}
      />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
