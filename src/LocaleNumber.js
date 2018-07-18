import withTranslations from './withTranslations';
import PropTypes from 'prop-types';

const LocaleNumber = ({ number, locale='en-US', maxDecimals }) => {
  try {
    const options = typeof maxDecimals === 'number' ?
      { maximumFractionDigits: maxDecimals } : {};
    return number.toLocaleString(locale, options);
  } catch (error) {
    return number;
  }
};

LocaleNumber.propTypes = {
  number: PropTypes.number.isRequired,
  maxDecimals: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default withTranslations(LocaleNumber);
