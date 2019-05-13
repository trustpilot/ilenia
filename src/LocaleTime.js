import PropTypes from 'prop-types';
import { useTranslations } from './';

const LocaleTime = ({ date, format }) => {
  const [, locale] = useTranslations();
  const dateWrapper = new Date(date);

  if (isNaN(dateWrapper)) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }

  try {
    return dateWrapper.toLocaleTimeString(locale, format);
  } catch (err) {
    return dateWrapper.toLocaleTimeString('en-US', format);
  }
};

LocaleTime.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  format: PropTypes.shape({
    weekday: PropTypes.oneOf(['narrow', 'short', 'long']),
    era: PropTypes.oneOf(['narrow', 'short', 'long']),
    year: PropTypes.oneOf(['numeric', '2-digit']),
    month: PropTypes.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    day: PropTypes.oneOf(['numeric', '2-digit']),
    hour: PropTypes.oneOf(['numeric', '2-digit']),
    minute: PropTypes.oneOf(['numeric', '2-digit']),
    second: PropTypes.oneOf(['numeric', '2-digit']),
    timeZoneName: PropTypes.oneOf(['short', 'long']),
  }),
};

export default LocaleTime;
