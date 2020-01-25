import JsTimeAgo from 'javascript-time-ago';

import { useTranslations } from '.';

import da from 'javascript-time-ago/locale/da';
import de from 'javascript-time-ago/locale/de';
import en from 'javascript-time-ago/locale/en';
import es from 'javascript-time-ago/locale/es';
import fi from 'javascript-time-ago/locale/fi';
import fr from 'javascript-time-ago/locale/fr';
import it from 'javascript-time-ago/locale/it';
import ja from 'javascript-time-ago/locale/ja';
import nb from 'javascript-time-ago/locale/nb';
import nl from 'javascript-time-ago/locale/nl';
import pl from 'javascript-time-ago/locale/pl';
import pt from 'javascript-time-ago/locale/pt';
import ru from 'javascript-time-ago/locale/ru';
import sv from 'javascript-time-ago/locale/sv';

JsTimeAgo.addLocale(da);
JsTimeAgo.addLocale(de);
JsTimeAgo.addLocale(en);
JsTimeAgo.addLocale(es);
JsTimeAgo.addLocale(fi);
JsTimeAgo.addLocale(fr);
JsTimeAgo.addLocale(it);
JsTimeAgo.addLocale(ja);
JsTimeAgo.addLocale(nb);
JsTimeAgo.addLocale(nl);
JsTimeAgo.addLocale(pl);
JsTimeAgo.addLocale(pt);
JsTimeAgo.addLocale(ru);
JsTimeAgo.addLocale(sv);

export interface TimeAgoProps {
  date: Date | string | number;
}

export const TimeAgo = ({ date }: TimeAgoProps) => {
  const dateWrapper = new Date(date);
  const [, locale] = useTranslations();

  if (dateWrapper.getTime && isNaN(dateWrapper.getTime())) {
    console.error('Invalid date');
    return null;
  }

  const timeAgo = new JsTimeAgo(locale);
  return timeAgo.format(dateWrapper);
};

export interface HumanizeTimeProps {
  time: number; // milli seconds
}

export const HumanizeTime = ({ time }: HumanizeTimeProps) => {
  const [, locale] = useTranslations();

  const timeAgo = new JsTimeAgo(locale);
  return timeAgo.format(time, 'time');
};
