import React from 'react';
import { interpolate } from '..';

test('It replaces a token in a string', () => {
  const [output] = interpolate('This string has [number] token', {
    number: 'one',
  });
  expect(output).toBe('This string has one token');
});

test('It replaces multiple tokens in a string', () => {
  const [output] = interpolate('This string has [number] [things]', {
    number: 2,
    things: 'tokens',
  });
  expect(output).toBe('This string has 2 tokens');
});

test('It replaces the multiple occurences of a token', () => {
  const [output] = interpolate('This string has [number] tokens, in [number] places', {
    number: 'two',
  });
  expect(output).toBe('This string has two tokens, in two places');
});

test('It uses a defined token tag', () => {
  const tags = {
    start: '{{',
    end: '}}',
  };

  const [output] = interpolate('This string has {{number}} token', { number: 'one' }, tags);
  expect(output).toBe('This string has one token');
});

test('Handles an empty input', () => {
  let output = interpolate('');
  expect(output).toEqual([]);

  output = interpolate();
  expect(output).toEqual([]);

  output = interpolate('nothing to do');
  expect(output).toEqual(['nothing to do']);
});

test('It replaces a token in a string with a component', () => {
  const tag = <span key="one">1</span>;
  const output = interpolate('This string has [number] token', { number: tag });

  expect(output).toEqual(['This string has ', <span key="one">1</span>, ' token']);
});

test('It replaces multiple tokens in a string with components', () => {
  const interpolations = {
    number: <span key="two">2</span>,
    things: <strong key="strong">things</strong>,
  };
  const output = interpolate('This string has [number] [things]', interpolations);

  expect(output).toEqual([
    'This string has ',
    <span key="two">2</span>,
    ' ',
    <strong key="strong">things</strong>,
  ]);
});

test('It collapses text interpolations when there are also components', () => {
  const interpolations = { review: 'hahaha', number: <span key="two">2</span> };
  const output = interpolate('This [review] has [number] tokens', interpolations);

  expect(output).toEqual(['This hahaha has ', <span key="two">2</span>, ' tokens']);
});

test('It uses a defined token tag with components', () => {
  const tags = {
    start: '{{',
    end: '}}',
  };

  const number = <span key="one">1</span>;
  const output = interpolate('This string has {{number}} token', { number: number }, tags);
  expect(output).toEqual(['This string has ', <span key="one">1</span>, ' token']);
});

test("Doesn't recursively substitute", () => {
  const interpolations = {
    one: '[one]',
    two: '[one]',
    three: '[more]',
    more: 'HAHA',
  };

  const [output] = interpolate('[one] [two] [three] [more] [three] [two] [one]', interpolations);

  expect(output).toBe('[one] [one] [more] HAHA [more] [one] [one]');
});

test('Emits error when component has no key prop', () => {
  const previousConsoleError = console.error;
  console.error = jest.fn();

  const interpolations = {
    number: <span>2</span>,
  };

  interpolate('Hello [number]', interpolations);

  expect(console.error).toHaveBeenCalledWith(
    'When you define a React component or HTML element as the value of an interpolation, you need to give it a unique `key` prop.'
  );

  console.error = previousConsoleError;
});
