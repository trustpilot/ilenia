import interpolate from '../interpolate';

test('It replaces a token in a string', () => {
  const output = interpolate('This string has {number} token', { number: 'one' });
  expect(output).toBe('This string has one token');
});

test('It replaces multiple tokens in a string', () => {
  const output = interpolate('This string has {number} {things}', { number: 'two', things: 'tokens' });
  expect(output).toBe('This string has two tokens');
});

test('It replaces the multiple occurences of a token', () => {
  const output = interpolate('This string has {number} tokens, in {number} places', { number: 'two' });
  expect(output).toBe('This string has two tokens, in two places');
});

test('It uses a defined token tag', () => {
  const tags = {
    start: '[',
    end: ']',
  };

  const output = interpolate('This string has [number] token', { number: 'one' }, tags);
  expect(output).toBe('This string has one token');
});

test('Handles an empty input', () => {
  let output = interpolate('');
  expect(output).toBe('');

  output = interpolate();
  expect(output).toBe('');
});
