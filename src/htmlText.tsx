import React from 'react';
import { parse } from 'htmlstring-to-react';

import { interpolate, Interpolations, Tag, useTranslations } from '.';

interface HtmlTextProps {
  id: string;
  interpolations?: Interpolations;
  tag?: Tag;
}

export const HtmlText = ({ id, interpolations, tag }: HtmlTextProps) => {
  const [translations] = useTranslations();
  const string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  const nodes = interpolate(string, interpolations, tag);
  return (
    <React.Fragment>
      {nodes.reduce<React.ReactNode[]>((acc, node) => {
        if (node) {
          acc.push(parse(node));
        }

        return acc;
      }, [])}
    </React.Fragment>
  );
};
