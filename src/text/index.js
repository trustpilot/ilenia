import { withTranslations } from '../';

const Text = ({ id, interpolations = {}, translations, tag = {start: '{', end: '}'} }) => {
  let string = translations[id];

  for (const key in interpolations) {
    const wrappedKey = `${tag.start}${key}${tag.end}`;
    string = string.replace(wrappedKey, interpolations[key]);
  }

  return string;
};

export default withTranslations(Text);
