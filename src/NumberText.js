import withTranslations from './withTranslations';
import PropTypes from 'prop-types';

const NumberText = ({ number, locale }) => {
  try {
    return number.toLocaleString(locale);
  } catch (error) {
    return number;
  }
};

Text.propTypes = {
  number: PropTypes.number.isRequired,
};

export default withTranslations(NumberText);
