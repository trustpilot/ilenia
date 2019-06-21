import * as React from 'react';
import { Interpolations, Tag } from './text';

function escapeRegex(str: string) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

function replaceRegex(tag: Tag, key: string) {
  return new RegExp(escapeRegex(`${tag.start}${key}${tag.end}`), 'g');
}

function isCastableToString(element: React.ReactNode) {
  return typeof element === 'string' || typeof element === 'number';
}

function isNotAnEmptyString(s: React.ReactNode) {
  return typeof s !== 'string' || s.length > 0;
}

function combineNodes([a, ...rest]: React.ReactNode[], s: React.ReactNode) {
  return isCastableToString(s) && isCastableToString(a)
    ? [(s as string) + (a as string), ...rest]
    : [s, a, ...rest];
}

function checkComponentForKey(component: React.ReactNode) {
  if (React.isValidElement(component) && !component.key) {
    console.error(
      'When you define a React component or HTML element as the value of an interpolation, you need to give it a unique `key` prop.'
    );
  }
}

export function interpolate(
  string = '',
  interpolations: Interpolations = {},
  tag: Tag = { start: '[', end: ']' }
): React.ReactNode[] {
  function* replace(
    interpolationKeys: string[],
    input?: string
  ): IterableIterator<React.ReactNode> {
    if (interpolationKeys.length === 0) {
      yield input;
      return;
    }

    const [key, ...remaining] = interpolationKeys;
    const pieces = (input || '').split(replaceRegex(tag, key));

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
    .reduceRight(combineNodes, [''])
    .filter(isNotAnEmptyString);
}
