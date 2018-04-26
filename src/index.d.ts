/// <reference types="react" />

declare namespace Props {
    export interface HtmlText {
        id: string;
        interpolations: {
            [key: string]: string;
        };
        tag?: {
            start: string;
            end: string;
        };
    }

    export interface Link {
        start?: string;
        end?: string;
        href: string;
        onClick?: (event: React.EventHandler<HTMLAnchorElement>) => {};
    }
    export interface LinkText {
        string: string;
        links: Link[];
    }

    export interface LocalizationProvider {
        children: React.ReactNode | React.ReactNode[];
        locale: string;
        translations: {
            [key: string]: string;
        }
        fallbackTranslations?: {
            [key: string]: string;
        }
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

    export interface NumberText {
        number: number;
    }
}

export const HtmlText: React.SFC<Props.HtmlText>
export const LinkText: React.SFC<Props.LinkText>
export const LocalizationProvider: React.SFC<Props.LocalizationProvider>
export const Text: React.SFC<Props.Text>
export function withTranslations (Component: React.ComponentType<any>): React.ComponentType<any>
