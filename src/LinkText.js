import React from 'react';
import PropTypes from 'prop-types';
import withTranslations from './withTranslations';
import reactStringReplace from 'react-string-replace';

const escapeRegex = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const linkRegex = (startTag, endTag) => new RegExp(`${escapeRegex(startTag)}(.*)${escapeRegex(endTag)}`, 'g');

const addDefaultValues = (link) => ({
  ...link,
  start: link.start || '[LINK-BEGIN]',
  end: link.end || '[LINK-END]',
});

const LinkText = ({ id, translations, links }) => {
  if (!translations[id]) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return <span />;
  }

  let translated = translations[id];

  links.map(addDefaultValues).map((link, index) => {
    const regexp = linkRegex(link.start, link.end);
    const linkKey = `link-text-${index}`;
    const linkProperties = { ...link };
    delete linkProperties.start;
    delete linkProperties.end;
    delete linkProperties.class;

    if (link.class) {
      linkProperties.className = link.class;
    }

    translated = reactStringReplace(translated, regexp, (match) => (
      <a {...linkProperties} key={linkKey}>
        {match}
      </a>
    ));

    return translated;
  });

  return translated;
};

LinkText.propTypes = {
  textKey: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default withTranslations(LinkText);
