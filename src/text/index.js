import { withTranslations } from '../';
import PropTypes from 'prop-types';

const Text = ({ id, interpolations = {}, translations, tag = {start: '{', end: '}'} }) => {
  let string = translations[id];

  const escapeRegex = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  };

  for (const key in interpolations) {
    const wrappedKey = `${tag.start}${key}${tag.end}`;
    const re = new RegExp(escapeRegex(wrappedKey), 'g');
    string = string.replace(re, interpolations[key]);
  }

  return string;
};

Text.propTypes = {
  id: PropTypes.string.isRequired,
  interpolations: PropTypes.object,
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default withTranslations(Text);
