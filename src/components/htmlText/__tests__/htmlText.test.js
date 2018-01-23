import React from 'react';
import renderer from 'react-test-renderer';
import LocalizationProvider from '../../provider';
import HtmlText from '../';

const translations = {
  'test1': 'Just a random string',
  'test2': 'A string but with {html} in it',
  'test3': 'A string that is sort of {html1}italic{html2} and {html3}bold{html4} and such',
  'test4': 'A string that is sort of {html1}italic{html2}',
  'test5': 'A string that uses [smtg1]another[smtg2] placeholder',
  'test6': 'A string that has <b>regular HTML</b> in it',
};

const setupText = (string, interpolations, tag) => (
  <LocalizationProvider locale="en-US" translations={translations}>
    <HtmlText id={string} interpolations={interpolations} tag={tag}/>
  </LocalizationProvider>
);

test('Renders a plain string', () => {
  const component = renderer.create(setupText('test1'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with one HTML part', () => {
  const component = renderer.create(setupText('test2', {html: '<span>hello</span>'} ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with multiple HTML parts in it', () => {
  const component = renderer.create(setupText('test3', {
    html1: '<em>',
    html2: '</em>',
    html3: '<b>',
    html4: '</b>',
  }));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with HTML parts in the end', () => {
  const component = renderer.create(setupText('test4', {
    html1: '<em>',
    html2: '</em>',
  }));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a string with HTML marked with another key', () => {
  const component = renderer.create(setupText('test5', {
    smtg1: '<b>',
    smtg2: '</b>',
  }, {
    start: '[',
    end: ']',
  }));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Renders a string with HTML in it', () => {
  const component = renderer.create(setupText('test6'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders nothing if the string is not there', () => {
  console.error = jest.fn(); // eslint-disable-line no-console

  const component = renderer.create(setupText('test7'));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
});
