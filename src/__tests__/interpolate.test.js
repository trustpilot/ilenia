import React from 'react';
import interpolate from '../interpolate';

test('It replaces a token in a string', () => {
  const [output] = interpolate('This string has {number} token', { number: 'one' });
  expect(output).toBe('This string has one token');
});

test('It replaces multiple tokens in a string', () => {
  const [output] = interpolate('This string has {number} {things}', { number: 'two', things: 'tokens' });
  expect(output).toBe('This string has two tokens');
});

test('It replaces the multiple occurences of a token', () => {
  const [output] = interpolate('This string has {number} tokens, in {number} places', { number: 'two' });
  expect(output).toBe('This string has two tokens, in two places');
});

test('It uses a defined token tag', () => {
  const tags = {
    start: '[',
    end: ']',
  };

  const [output] = interpolate('This string has [number] token', { number: 'one' }, tags);
  expect(output).toBe('This string has one token');
});

test('Handles an empty input', () => {
  let output = interpolate('');
  expect(output).toEqual([]);

  output = interpolate();
  expect(output).toEqual([]);

  [output] = interpolate('nothing to do');
  expect(output).toBe('nothing to do');
});

test('It replaces a token in a string with a component', () => {
  const tag = (<number>1</number>);
  const output = interpolate('This string has {number} token', { number: tag });

  expect(output).toEqual(['This string has ', (<number>1</number>), ' token']);
});

test('It replaces multiple tokens in a string with components', () => {
  const interpolations = { number: (<number>2</number>), things: (<strong>things</strong>) };
  const output = interpolate('This string has {number} {things}', interpolations);

  expect(output).toEqual(['This string has ', (<number>2</number>), ' ', (<strong>things</strong>)]);
});

test('It collapses text interpolations when there are also components', () => {
  const interpolations = { review: 'hahaha', number: (<number>2</number>) };
  const output = interpolate('This {review} has {number} tokens', interpolations);

  expect(output).toEqual([
    'This hahaha has ',
    (<number>2</number>),
    ' tokens']);
});

test('It uses a defined token tag with components', () => {
  const tags = {
    start: '[',
    end: ']',
  };

  const number = (<number>1</number>);
  const output = interpolate('This string has [number] token', { number: number }, tags);
  expect(output).toEqual(['This string has ', (<number>1</number>), ' token']);
});

test('Doesn\'t recursively substitute', () => {
  const interpolations = {
    one: '{one}',
    two: '{one}',
    three: '{more}',
    more: 'HAHA',
  };

  const [output] = interpolate('{one} {two} {three} {more} {three} {two} {one}', interpolations);

  expect(output).toBe('{one} {one} {more} HAHA {more} {one} {one}');
});
