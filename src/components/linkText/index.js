import React from 'react';
import PropTypes from 'prop-types';
import withTranslations from '../withTranslations';
import ReactHtmlParser from 'react-html-parser';

const linkToAttributes = (link) =>
  Object
    .keys(link)
    .filter((key) => key !== 'start' && key !== 'end')
    .reduce((attributes, key) => `${attributes} ${key}=${link[key]}`, '');

const escapeRegex = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const linkRegex = (startTag, endTag) =>
  new RegExp(`${escapeRegex(startTag)}(.*)${escapeRegex(endTag)}`, 'g');

const replaceWithLink = (string, link) =>
  string.replace(linkRegex(link.start, link.end),
    `<a ${linkToAttributes(link)}>$1</a>`);

const addDefaultValues = (link) => ({
  ...link,
  start: link.start || '[LINK-BEGIN]',
  end: link.end || '[LINK-END]',
});


const LinkText = ({ string, translations, links }) => {
  if (!translations[string]) {
    console.error(`Couldn't find '${string}' in the translations table`); // eslint-disable-line no-console
    return <span/>;
  }

  const translated = translations[string];
  const htmlString = links
    .map(addDefaultValues)
    .reduce(replaceWithLink, translated);

  return ReactHtmlParser(htmlString);
};

LinkText.propTypes = {
  string: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    href: PropTypes.string,
  })),
};

export default withTranslations(LinkText);
