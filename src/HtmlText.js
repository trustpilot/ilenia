import PropTypes from 'prop-types';
import { parse } from 'htmlstring-to-react';
import { interpolate } from './';
import { useTranslations } from './';

const HtmlText = ({ id, interpolations = {}, tag }) => {
  const [translations] = useTranslations();
  const string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  const strings = interpolate(string, interpolations, tag);
  return strings.map(parse);
};

HtmlText.propTypes = {
  id: PropTypes.string.isRequired,
  interpolations: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default HtmlText;
