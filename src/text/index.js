import { withTranslations } from '../';
import { interpolate } from '../interpolations';
import PropTypes from 'prop-types';

const Text = ({ id, interpolations = {}, translations = {}, tag = {start: '{', end: '}'} }) => {
  const string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  return interpolate(string, interpolations, tag);
};

Text.propTypes = {
  id: PropTypes.string.isRequired,
  interpolations: PropTypes.objectOf(PropTypes.string),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default withTranslations(Text);
