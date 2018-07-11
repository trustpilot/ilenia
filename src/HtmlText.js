import PropTypes from 'prop-types';
import { parse } from 'htmlstring-to-react';
import withTranslations from './withTranslations';
import interpolate from './interpolate';

const HtmlText = ({ id, interpolations = {}, translations = {}, tag }) => {
  let string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  string = interpolate(string, interpolations, tag);
  return parse(string);
};

HtmlText.propTypes = {
  id: PropTypes.string.isRequired,
  interpolations: PropTypes.objectOf(PropTypes.string),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default withTranslations(HtmlText);
