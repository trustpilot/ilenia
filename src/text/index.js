import { withTranslations } from '../';

const Text = ({ id, interpolations = {}, translations }) => {
  let string = translations[id];

  for (const key of interpolations) {
    string = string.replace(key, interpolations[key]);
  }

  return string;
};

export default withTranslations(Text);
