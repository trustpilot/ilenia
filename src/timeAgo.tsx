import JsTimeAgo from 'javascript-time-ago';

import { useTranslations } from '.';

import da from 'javascript-time-ago/locale/da';
import de from 'javascript-time-ago/locale/de';
import en from 'javascript-time-ago/locale/en';
import es from 'javascript-time-ago/locale/es';
import fr from 'javascript-time-ago/locale/fr';
import it from 'javascript-time-ago/locale/it';
import nl from 'javascript-time-ago/locale/nl';
import sv from 'javascript-time-ago/locale/sv';

JsTimeAgo.addLocale(da);
JsTimeAgo.addLocale(de);
JsTimeAgo.addLocale(en);
JsTimeAgo.addLocale(en);
JsTimeAgo.addLocale(es);
JsTimeAgo.addLocale(fr);
JsTimeAgo.addLocale(it);
JsTimeAgo.addLocale(nl);
JsTimeAgo.addLocale(sv);

interface TimeAgoProps {
  date: Date | string | number;
}

export const TimeAgo = ({ date }: TimeAgoProps) => {
  const dateWrapper = new Date(date);
  const [_, locale] = useTranslations();

  if (dateWrapper.getTime && isNaN(dateWrapper.getTime())) {
    console.error('Invalid date');
    return null;
  }

  const timeAgo = new JsTimeAgo(locale);
  return timeAgo.format(dateWrapper);
};
