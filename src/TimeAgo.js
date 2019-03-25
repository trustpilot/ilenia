import React from 'react';
import withTranslations from './withTranslations';
import PropTypes from 'prop-types';
import JavascriptTimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import da from 'javascript-time-ago/locale/da';
import de from 'javascript-time-ago/locale/de';
import en from 'javascript-time-ago/locale/en';
import es from 'javascript-time-ago/locale/es';
import fr from 'javascript-time-ago/locale/fr';
import it from 'javascript-time-ago/locale/it';
import nl from 'javascript-time-ago/locale/nl';
import sv from 'javascript-time-ago/locale/sv';

JavascriptTimeAgo.locale(da);
JavascriptTimeAgo.locale(de);
JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(es);
JavascriptTimeAgo.locale(fr);
JavascriptTimeAgo.locale(it);
JavascriptTimeAgo.locale(nl);
JavascriptTimeAgo.locale(sv);

const TimeAgo = ({ date, locale }) => {
  const dateObject = new Date(date);
  const [language] = locale.split('-');

  if (isNaN(dateObject)) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }

  return <ReactTimeAgo date={dateObject} locale={language} />;
};

TimeAgo.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
};

export default withTranslations(TimeAgo);
