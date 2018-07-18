import withTranslations from './withTranslations';
import PropTypes from 'prop-types';

const LocaleDate = ({ date, locale }) => {
  const dateWrapper = new Date(date);

  if (isNaN(dateWrapper)) {
    console.error('Invalid date');
    return null;
  }

  try {
    return dateWrapper.toLocaleDateString(locale);
  } catch (err) {
    return dateWrapper.toLocaleDateString('en-US');
  }
};

LocaleDate.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
};

export default withTranslations(LocaleDate);
