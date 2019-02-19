import withTranslations from './withTranslations';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';

import da from 'timeago.js/locales/da';
import de from 'timeago.js/locales/de';
import en from 'timeago.js/locales/en';
import es from 'timeago.js/locales/es';
import fr from 'timeago.js/locales/fr';
import it from 'timeago.js/locales/it';
import nl from 'timeago.js/locales/nl';
import sv from 'timeago.js/locales/sv';

timeago.register('da-DK', da);
timeago.register('de-DE', de);
timeago.register('en-GB', en);
timeago.register('en-US', en);
timeago.register('es-ES', es);
timeago.register('fr-FR', fr);
timeago.register('it-IT', it);
timeago.register('nl-NL', nl);
timeago.register('sv-SE', sv);

const TimeAgo = ({ date, locale }) => {
  const dateWrapper = new Date(date);
  const timeagoInstance = timeago();

  if (isNaN(dateWrapper)) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }

  return timeagoInstance.format(date, locale);
};

TimeAgo.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
};

export default withTranslations(TimeAgo);
