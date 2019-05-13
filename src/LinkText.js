import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'htmlstring-to-react';
import { interpolate } from './';
import { useTranslations } from './';

const escapeRegex = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const linkRegex = (startTag, endTag) =>
  new RegExp(`${escapeRegex(startTag)}(.*)${escapeRegex(endTag)}`, 'g');

const addDefaultValues = (link) => ({
  ...link,
  start: link.start || '[LINK-BEGIN]',
  end: link.end || '[LINK-END]',
});

const LinkText = ({ id, links, interpolations, tag }) => {
  const [translations] = useTranslations();
  if (!translations[id]) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return <span />;
  }

  let translated = translations[id];
  const overrides = {};

  links.map(addDefaultValues).map((link, index) => {
    const regexp = linkRegex(link.start, link.end);
    const key = `link-text-${index}`;

    const props = {
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

    function insertTag(match) {
      const textContent = match.substring(link.start.length, match.length - link.end.length);
      return `<a key="${key}">${textContent}</a>`;
    }

    translated = translated.replace(regexp, insertTag);
    return translated;
  });

  return parse(translated, {
    dom: {
      ADD_ATTR: ['target', 'key'],
    },
    overrides,
  }).reduce(
    (arr, item) =>
      arr.concat(
        typeof item === 'string' && interpolations ? interpolate(item, interpolations, tag) : [item]
      ),
    []
  );
};

LinkText.propTypes = {
  id: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  interpolations: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number])
  ),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default LinkText;
