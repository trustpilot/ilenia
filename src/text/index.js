import { withTranslations } from '../';

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

export default withTranslations(Text);
