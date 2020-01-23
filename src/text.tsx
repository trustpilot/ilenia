import React from 'react';
import { interpolate, useTranslations } from '.';

export interface Tag {
  start: string;
  end: string;
}

export interface Interpolations {
  [keyof: string]: React.ReactNode;
}

export interface TextProps {
  id: string;
  interpolations?: Interpolations;
  tag?: Tag;
}

export const Text = ({ id, interpolations, tag }: TextProps) => {
  const [translations] = useTranslations();
  const string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  return <React.Fragment>{interpolate(string, interpolations, tag)}</React.Fragment>;
};
