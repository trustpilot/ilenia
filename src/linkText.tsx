import React from 'react';
import { parse } from 'htmlstring-to-react';
import { SelectorsToElement } from 'htmlstring-to-react/lib/override';

import { interpolate, useTranslations } from '.';
import { Interpolations, Tag } from './text';

export interface Link {
  start?: string;
  end?: string;
  href?: string;
  onClick?: () => void;
  class?: string;
  className?: string;
  target?: string;
  id?: string;
}

export interface LinkTextProps {
  id: string;
  interpolations?: Interpolations;
  links: Link[];
  tag?: Tag;
}

const escapeRegex = (str: string) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const linkRegex = (startTag: string, endTag: string) =>
  new RegExp(`${escapeRegex(startTag)}(.*)${escapeRegex(endTag)}`, 'g');

const addDefaultValues = (link: Link) => ({
  ...link,
  start: link.start || '[LINK-BEGIN]',
  end: link.end || '[LINK-END]',
});

export const LinkText = ({ id, links, interpolations, tag }: LinkTextProps) => {
  const [translations] = useTranslations();
  if (!translations[id]) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  let translated = translations[id];
  const overrides: SelectorsToElement = {};

  links.map(addDefaultValues).map((link, index) => {
    const regexp = linkRegex(link.start, link.end);
    const key = `link-text-${index}`;

    const props: { [keyof: string]: any } = {
      className: link.class || link.className,
      href: link.href,
      id: link.id,
      key: key,
      target: link.target,
      onClick: link.onClick,
    };

    Object.keys(props).forEach((key) => typeof props[key] === 'undefined' && delete props[key]);

    overrides[`a[key="${key}"]`] = (_, textContent) => (
      <a {...props}>
        {interpolations ? interpolate(textContent, interpolations, tag) : textContent}
      </a>
    );

    function insertTag(match: string) {
      const textContent = match.substring(link.start.length, match.length - link.end.length);
      return `<a key="${key}">${textContent}</a>`;
    }

    translated = translated.replace(regexp, insertTag);
    return translated;
  });

  return (
    <React.Fragment>
      {parse(translated, {
        dom: {
          ADD_ATTR: ['target', 'key'],
        },
        overrides,
      }).reduce<React.ReactNode[]>((arr, item) => {
        return arr.concat(
          typeof item === 'string' && interpolations
            ? interpolate(item, interpolations, tag)
            : [item]
        );
      }, [])}
    </React.Fragment>
  );
};
