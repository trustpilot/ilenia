import React from 'react';
import PropTypes from 'prop-types';
import {withTranslations} from '../';

const LinkString = (props) => {
  const { string, translations } = props;

  if (!translations[string]) {
    console.error(`Couldn't find '${string}' in the translations table`); // eslint-disable-line no-console
    return <span/>;
  }

  const links = props.links.map((link) => ({
    ...link,
    start: link.start || '[LINK-BEGIN]',
    end: link.end || '[LINK-END]',
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

  const parts = replace(translations[string], links);
  return parts.map((part, index) => {
    return typeof(part) === 'string' ? <span key={index}>{part}</span> : part; // eslint-disable-line react/no-array-index-key
  });
};

LinkString.propTypes = {
  string: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    href: PropTypes.string,
  })),
};

export default withTranslations(LinkString);
