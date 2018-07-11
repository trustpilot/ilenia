import withTranslations from './withTranslations';
import PropTypes from 'prop-types';

const LocaleNumber = ({ number, locale }) => {
  try {
    return number.toLocaleString(locale);
  } catch (error) {
    return number;
  }
};

LocaleNumber.propTypes = {
  number: PropTypes.number.isRequired,
};

export default withTranslations(LocaleNumber);
