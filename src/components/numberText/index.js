import withTranslations from '../withTranslations';
import PropTypes from 'prop-types';

const NumberText = ({ value, locale }) => {
  try {
    return value.toLocaleString(locale);
  } catch (error) {
    return value;
  }
};

Text.propTypes = {
  value: PropTypes.number.isRequired,
};

export default withTranslations(NumberText);
