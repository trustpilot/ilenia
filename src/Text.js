import interpolate from './interpolate';
import PropTypes from 'prop-types';
import { useTranslations } from './';

const Text = ({ id, interpolations = {}, tag }) => {
  const [translations] = useTranslations();
  const string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  return interpolate(string, interpolations, tag);
};

Text.propTypes = {
  id: PropTypes.string.isRequired,
  interpolations: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number])
  ),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default Text;
