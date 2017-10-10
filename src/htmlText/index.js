import React from 'react';
import { withTranslations } from '../';
import sanitizeHtml from 'sanitize-html';

const HtmlText = ({ id, interpolations = {}, translations, tag = {start: '[', end: ']'} }) => {
  let string = translations[id];

  const escapeRegex = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  };

  for (const key in interpolations) {
    // NOTE: sanitize-html currently closes open tags, and deletes close tags if an open tag is not found, which breaks our use case. A new solution must be found...
    // interpolations[key] = sanitizeHtml(interpolations[key]);
    const wrappedKey = `${tag.start}${key}${tag.end}`;
    const re = new RegExp(escapeRegex(wrappedKey), 'g');
    string = string.replace(re, interpolations[key]);
  }

  return (<span dangerouslySetInnerHTML={ {__html: string} }></span>);
};

export default withTranslations(HtmlText);
