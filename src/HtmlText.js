import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import withTranslations from './withTranslations';
import interpolate from './interpolate';

const HtmlText = ({ textKey, interpolations = {}, translations = {}, tag }) => {
  let string = translations[textKey];
  if (!string) {
    console.error(`Couldn't find '${textKey}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  string = interpolate(string, interpolations, tag);
  return Parser(string);
};

HtmlText.propTypes = {
  textKey: PropTypes.string.isRequired,
  interpolations: PropTypes.objectOf(PropTypes.string),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default withTranslations(HtmlText);
