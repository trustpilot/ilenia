/// <reference types="react" />

declare namespace Props {
  export interface HtmlText {
    id: string;
    interpolations: {
      [key: string]: string | number;
    };
    tag?: {
      start: string;
      end: string;
    };
  }

  export interface Link {
    start?: string;
    end?: string;
    target?: string;
    id?: string;
    class?: string;
    className?: string;
    href?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
  }
  export interface LinkText {
    id: string;
    links: Link[];
  }

  export interface LocalizationProvider {
    children: React.ReactNode | React.ReactNode[];
    locale: string;
    translations: {
      [key: string]: string;
    };
    fallbackTranslations?: {
      [key: string]: string;
    };
  }

  export interface Text {
    id: string;
    interpolations?: {
      [key: string]: string | number;
    };
    translations?: {
      [key: string]: string;
    };
    tag?: {
      start: string;
      end: string;
    };
  }

  export interface LocaleNumber {
    number: number;
    maxDecimals?: number | string;
  }

  export interface LocaleDate {
    date: number | string | Date;
    format?: {
      weekday?: "narrow" | "short" | "long";
      era?: "narrow" | "short" | "long";
      year?: "numeric" | "2-digit";
      month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
      day?: "numeric" | "2-digit";
      hour?: "numeric" | "2-digit";
      minute?: "numeric" | "2-digit";
      second?: "numeric" | "2-digit";
      timeZoneName?: "short" | "long";
    };
  }

  export interface TimeAgo {
    date: number | string | Date;
  }
}

export const HtmlText: React.SFC<Props.HtmlText>;
export const LinkText: React.SFC<Props.LinkText>;
export const LocaleDate: React.SFC<Props.LocaleDate>;
export const LocaleNumber: React.SFC<Props.LocaleNumber>;
export const Text: React.SFC<Props.Text>;
export const TimeAgo: React.SFC<Props.TimeAgo>;

export const LocalizationProvider: React.SFC<Props.LocalizationProvider>;
export function withTranslations(
  Component: React.ComponentType<any>
): React.ComponentType<any>;
export function interpolate(
  text: string,
  interpolations?: {
    [key: string]: string | number;
  },
  tag?: {
    start: string;
    end: string;
  }
): string;
