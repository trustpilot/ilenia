import React from 'react';
import { withTranslations } from '../';
import sanitizeHtml from 'sanitize-html';

const HtmlText = ({ id, interpolations = [], translations, key = '[HTML]' }) => {
  let string = translations[id];

  interpolations.forEach((html) => {
    html = sanitizeHtml(html);
  });

  const stringArray = string.split(key);

  if (stringArray.length <= 0) {
    return string;
  } else {
    stringArray.forEach((part, index) => {
      stringArray[index] += (interpolations[index] || '');
    });
  }

  string = stringArray.join('');
  return (<span dangerouslySetInnerHTML={ {__html: string} }></span>);
};

export default withTranslations(HtmlText);
