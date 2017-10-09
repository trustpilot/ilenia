import { withTranslations } from '../';

const Text = ({ id, interpolations = {}, translations }) => {
  let string = translations[id];

  for (const key in interpolations) {
    string = string.replace(`{${key}}`, interpolations[key]);
  }

  return string;
};

export default withTranslations(Text);
