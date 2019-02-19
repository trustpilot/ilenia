import React from 'react';
const escapeRegex = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
const replaceRegex = (tag, key) => new RegExp(escapeRegex(`${tag.start}${key}${tag.end}`), 'g');

const isCastableToString = (element) => {
  return typeof element === 'string' || typeof element === 'number';
};

const combineStrings = ([a, ...rest], s) =>
  isCastableToString(s) && isCastableToString(a) ? [s + a, ...rest] : [s, a, ...rest];

const isNotAnEmptyString = (s) => typeof s !== 'string' || s.length > 0;

const checkComponentForKey = (component) => {
  if (React.isValidElement(component) && !component.key) {
    /* eslint-disable no-console */
    /* eslint-disable max-len */
    console.error(
      'When you define a React component or HTML element as the value of an interpolation, you need to give it a unique `key` prop.'
    );
    /* eslint-enable */
  }
};

export default (string = '', interpolations = {}, tag = { start: '[', end: ']' }) => {
  function* replace(interpolationKeys, input) {
    if (interpolationKeys.length === 0) {
      yield input;
      return;
    }

    const [key, ...remaining] = interpolationKeys;
    const pieces = input.split(replaceRegex(tag, key));

    yield* replace(remaining, pieces.shift());
    while (pieces.length > 0) {
      checkComponentForKey(interpolations[key]);
      yield interpolations[key];
      yield* replace(remaining, pieces.shift());
    }
  }

  const keys = Object.keys(interpolations);
  const segments = replace(keys, string);
  return Array.from(segments)
    .reduceRight(combineStrings, [''])
    .filter(isNotAnEmptyString);
};
