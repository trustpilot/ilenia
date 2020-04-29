import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LocalizationProvider, LinkText, LocaleDate } from '..';

const translations = {
  test1: 'No links in the string',
  test2: 'A link [LINK-BEGIN]in the[LINK-END] middle',
  test3: 'A link [LINK-BEGIN]in the[LINK-END] middle and one [LINK2-BEGIN]in the end[LINK2-END]',
  test4: 'A link [LINK-BEGIN]in the[LINK-END] middle',
  test5: 'A link [LINK-BEGIN]in the[LINK-END] middle and a date: [fromDate]',
  test6: 'From [LINK-BEGIN][fromDate][LINK-END] to [toDate]',
};

test('Renders a string with no links in it', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test1" links={[]} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with one link in the middle', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test2" links={[{ href: 'http://something' }]} />
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
      <LinkText id="test3" links={links} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with a link with arbitrary attributes', () => {
  const links = [
    {
      href: 'http://something1',
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'button',
    },
  ];

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test4" links={links} />
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
      <LinkText id="test4" links={links} />
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
      <LinkText id="not-there" links={[]} />
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
    fromDate: <LocaleDate date={new Date(2019, 1, 1)} />,
  };

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test5" links={links} interpolations={interpolations} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with a link and an interpolated value inside, plus an interpolated value', () => {
  const links = [
    {
      href: 'http://something1',
    },
  ];

  const interpolations = {
    fromDate: <LocaleDate key="from-date" date={new Date(2019, 1, 1)} />,
    toDate: <LocaleDate key="to-date" date={new Date(2019, 1, 28)} />,
  };

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <LinkText id="test6" links={links} interpolations={interpolations} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
