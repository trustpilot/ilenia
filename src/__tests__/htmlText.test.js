import React from 'react';
import { render } from 'react-testing-library';
import LocalizationProvider from '../LocalizationProvider';
import { HtmlText } from '../';

const translations = {
  test1: 'Just a random string',
  test2: 'A string but with [html] in it',
  test3: 'A string that is sort of [html1]italic[html2] and [html3]bold[html4] and such',
  test4: 'A string that is sort of [html1]italic[html2]',
  test5: 'A string that uses {{smtg1}}another{{smtg2}} placeholder',
  test6: 'A string that has <b key="b">regular HTML</b> in it',
};

const setupText = (string, interpolations, tag, eventHandlers) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <HtmlText id={string} interpolations={interpolations} tag={tag} eventHandlers={eventHandlers} />
  </LocalizationProvider>
);

test('Renders a plain string', () => {
  const { asFragment } = render(setupText('test1'));
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with one HTML part', () => {
  const { asFragment } = render(setupText('test2', { html: '<span key="hello">hello</span>' }));
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with multiple HTML parts in it', () => {
  const { asFragment } = render(
    setupText('test3', {
      html1: '<em key="em">',
      html2: '</em>',
      html3: '<b key="b">',
      html4: '</b>',
    })
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with HTML parts in the end', () => {
  const { asFragment } = render(
    setupText('test4', {
      html1: '<em key="em">',
      html2: '</em>',
    })
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with HTML marked with another key', () => {
  const { asFragment } = render(
    setupText(
      'test5',
      {
        smtg1: '<b key="b">',
        smtg2: '</b>',
      },
      {
        start: '{{',
        end: '}}',
      }
    )
  );

  expect(asFragment()).toMatchSnapshot();
});

test('Renders a string with HTML in it', () => {
  const { asFragment } = render(setupText('test6'));
  expect(asFragment()).toMatchSnapshot();
});

test('Renders nothing if the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console

  const { asFragment } = render(setupText('test7'));

  expect(asFragment()).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});
