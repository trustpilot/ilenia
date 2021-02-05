import React from 'react';
import { interpolate, useTranslations } from '.';

export interface Tag {
  start: string;
  end: string;
}

export interface Suffix {
  begin: string;
  end: string;
}

interface SingleInterpolations {
  [keyof: string]: React.ReactNode;
}

interface PairInterpolations {
  [keyof: string]: (match: React.ReactNode) => React.ReactNode;
}
export interface Interpolations {
  [keyof: string]: SingleInterpolations[string] | PairInterpolations[string];
}

export interface TextProps {
  id: string;
  interpolations?: Interpolations;
  tag?: Tag;
  suffix?: Suffix;
}

function isFunction(val: Interpolations[string]): val is PairInterpolations[string] {
  return typeof val === "function";
}

const toTag = (key: string, tag: Tag, suffix: string = '') =>
  `${tag.start}${key}${suffix}${tag.end}`;

const escapeRegex = (str: string) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const nodeRegex = (begin: string, end: string) =>
  new RegExp(`${escapeRegex(begin)}(.*)${escapeRegex(end)}`, 'g');

const hasKeys = (obj: Interpolations) => Object.keys(obj).length > 0;

export const Text = ({
  id,
  interpolations = {},
  tag = { start: '[', end: ']' },
  suffix = { begin: '-begin', end: '-end' },
}: TextProps) => {
  const [translations] = useTranslations();
  let string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  if (hasKeys(interpolations)) {

    const initValue: {
      single: SingleInterpolations;
      pair: PairInterpolations;
    } = { single: {}, pair: {} };

    const { pair, single } = Object.entries(interpolations).reduce((acc, [key, value]) => {
      if (string.includes(toTag(key, tag))) {
        acc.single[key] = value;
      } else if (
        string.includes(toTag(key, tag, suffix.begin)) &&
        string.includes(toTag(key, tag, suffix.end)) &&
        isFunction(value) // very weak check
      ) {
        acc.pair[key] = value;
      }
      return acc;
    }, initValue);

    const pairInterpolations: SingleInterpolations = {};
    Object.keys(pair).forEach((key) => {
      const regexp = nodeRegex(toTag(`${key}${suffix.begin}`, tag), toTag(`${key}${suffix.end}`, tag));
      const matches = regexp.exec(string);
      if (matches === null) return;
      const [fullMatch, insideMatch] = matches;
      const uniqueKey = `${key}-pair`;

      const match = hasKeys(single) ? interpolate(insideMatch, single, tag) : insideMatch;
      pairInterpolations[uniqueKey] = pair[key](match);
      string = string.replace(fullMatch, `${tag.start}${uniqueKey}${tag.end}`)
    });
    return <React.Fragment>{interpolate(string, { ...single, ...pairInterpolations }, tag)}</React.Fragment>
  } else {
    return <>{string}</>;
  }
};
