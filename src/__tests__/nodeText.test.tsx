import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LocalizationProvider, NodeText, LocaleDate } from '..';
import { Node } from '../nodeText';

const translations = {
  test1: 'No nodes in the string',
  test2: 'A node [NODE-BEGIN]in the[NODE-END] middle',
  test3: 'A node [NODE-BEGIN]in the[NODE-END] middle and one [NODE2-BEGIN]in the end[NODE2-END]',
  test4: 'A node [NODE-BEGIN]in the[NODE-END] middle',
  test5: 'A node [NODE-BEGIN]in the[NODE-END] middle and a date: [fromDate]',
  test6: 'From [NODE-BEGIN][fromDate][NODE-END] to [toDate]',
};

test('Renders a string with no links in it', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test1" nodes={[]} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with one node in the middle', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test2" nodes={[{ render: (m, key) => <p key={key}>{m}</p> }]} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});


test('Renders a string with one node and custom tags', () => {
  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test2" nodes={[{ render: (m, key) => <p key={key}>{m}</p> }]} tag={{ start: '{', end: '}' }}/>
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with multiple nodes in it', () => {
  const nodes: Node[] = [
    {
      render: (m, key) => <p key={key}>{m}</p>,
    },
    {
      start: '[NODE2-BEGIN]',
      end: '[NODE2-END]',
      render: (m, key) => <span key={key}>{m}</span>,
    },
  ];

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test3" nodes={nodes} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with a working onClick callback', () => {
  const onClickSpy = jest.fn();

  const nodes: Node[] = [
    {
      render: (m, k) => <button onClick={onClickSpy} key={k}>{m}</button>
    },
  ];

  const { getByText, asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test4" nodes={nodes} />
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
      <NodeText id="not-there" nodes={[]} />
    </LocalizationProvider>
  );

  expect(asFragment()).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});

test('Renders a string with a node and an interpolated value', () => {
  const nodes: Node[] = [
    {
      render: (m, k) => <p key={k}>{m}</p>,
    },
  ];

  const interpolations = {
    fromDate: <LocaleDate date={new Date(2019, 1, 1)} />,
  };

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test5" nodes={nodes} interpolations={interpolations} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with a node and an interpolated value inside, plus an interpolated value', () => {
  const nodes: Node[] = [
    {
      render: (m, k) => <p key={k}>{m}</p>,
    },
  ];

  const interpolations = {
    fromDate: <LocaleDate key="from-date" date={new Date(2019, 1, 1)} />,
    toDate: <LocaleDate key="to-date" date={new Date(2019, 1, 28)} />,
  };

  const { asFragment } = render(
    <LocalizationProvider locale="en-US" translations={translations}>
      <NodeText id="test6" nodes={nodes} interpolations={interpolations} />
    </LocalizationProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
