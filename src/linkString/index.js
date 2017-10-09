import React from 'react';
import {withTranslations} from '../';

const LinkString = (props) => {
  const { string, translations } = props;

  const links = props.links.map((link) => ({
    ...link,
    start: link.start || '[LINK-BEGIN]',
    end: link.end || '[LINK-END]'
  }));

  function replace(inputString, links) {
    // no more replacements to be done
    if (links.length === 0) {
      return [inputString];
    }

    const link = links[0];
    const remainingLinks = links.slice(1);

    // this tag doesn't exist in this text segment
    if (inputString.indexOf(link.start) === -1) {
      if (inputString.indexOf(link.end) !== -1) {
        throw new Error('Bad string. Start tag does not exist in the text segment but the end tag does.');
      }
      return replace(inputString, remainingLinks);
    }

    if (inputString.indexOf(link.end) === -1) {
      throw new Error('Bad string. Start tag exists in the text segment but the end tag does not.');
    }

    const [head, something] = inputString.split(link.start);
    const [linkBody, tail] = something.split(link.end);

    const startToken = link.start;
    delete link.start;
    delete link.end;

    const linkComponent = <a key={startToken} {...link}>{linkBody}</a>;

    return [...replace(head, remainingLinks), linkComponent, ...replace(tail, remainingLinks)];
  }

  if (!translations[string]) {
    return string;
  }

  const parts = replace(translations[string], links);
  return parts.map((part, index) => {
    return typeof(part) === 'string' ? <span key={index}>{part}</span> : part;
  });
};

export default withTranslations(LinkString);
