import PropTypes from 'prop-types';
import { useTranslations } from './';

const LocaleNumber = ({ number, maxDecimals }) => {
  const [, locale] = useTranslations();

  try {
    const options = typeof maxDecimals === 'number' ? { maximumFractionDigits: maxDecimals } : {};
    return number.toLocaleString(locale, options);
  } catch (error) {
    return number;
  }
};

LocaleNumber.propTypes = {
  number: PropTypes.number.isRequired,
  maxDecimals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LocaleNumber;
