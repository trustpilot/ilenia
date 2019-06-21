import React from 'react';
import { useTranslations } from '.';

interface LocaleNumberProps {
  number: number;
  maxDecimals?: number | string;
}

interface LocaleDateProps {
  date: string | number | Date;
  format?: {
    weekday?: 'narrow' | 'short' | 'long';
    era?: 'narrow' | 'short' | 'long';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    timeZoneName?: 'short' | 'long';
  };
}

export const LocaleNumber = ({ number, maxDecimals }: LocaleNumberProps) => {
  const [, locale] = useTranslations();

  try {
    const options = typeof maxDecimals === 'number' ? { maximumFractionDigits: maxDecimals } : {};
    return <React.Fragment>{number.toLocaleString(locale, options)}</React.Fragment>;
  } catch (error) {
    return <React.Fragment>{number}</React.Fragment>;
  }
};

export const LocaleDate = ({ date, format }: LocaleDateProps) => {
  const [, locale] = useTranslations();
  const dateWrapper = new Date(date);

  if (dateWrapper.getTime && isNaN(dateWrapper.getTime())) {
    console.error('Invalid date');
    return null;
  }

  try {
    return <React.Fragment>{dateWrapper.toLocaleDateString(locale, format)}</React.Fragment>;
  } catch (err) {
    return <React.Fragment>{dateWrapper.toLocaleDateString('en-US', format)}</React.Fragment>;
  }
};

export const LocaleTime = ({ date, format }: LocaleDateProps) => {
  const [, locale] = useTranslations();
  const dateWrapper = new Date(date);

  if (dateWrapper.getTime && isNaN(dateWrapper.getTime())) {
    console.error('Invalid date');
    return null;
  }

  try {
    return <React.Fragment>{dateWrapper.toLocaleTimeString(locale, format)}</React.Fragment>;
  } catch (err) {
    return <React.Fragment>{dateWrapper.toLocaleTimeString('en-US', format)}</React.Fragment>;
  }
};
