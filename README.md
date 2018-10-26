# ilenia [![Build Status][travis-image]][travis-url]

[travis-image]: https://travis-ci.com/trustpilot/react-localization.svg?token=31wEEtXqqxi38BDzGaqH&branch=master
[travis-url]: https://travis-ci.com/trustpilot/react-localization

A library for localization in React. Simple, declarative and focused on components..

Named after our dear and glorious Localization Coordinator at Trustpilot. But she made us come up with an acronym, so here goes: **i**ntentional **l**ibrary **e**xtending **n**atural **i**nternationalization **a**lgorithms

## Table of contents

- [Using the library](#using-the-library)
- [Components](#components)
  - [Text](#text)
  - [LinkText](#linktext)
  - [HtmlText](#htmltext)
  - [LocaleNumber](#localenumber)
  - [LocaleDate](#localedate)
  - [TimeAgo](#timeago)
  - [withTranslations](#withtranslations)
  - [interpolate](#interpolate)

## How to contribute ?

This repo enforce commit style so the release process is automatic. Commits must look like:

    <SUBJECT>: Message starting with an uppercase

Choose your SUBJECT according to this logic:

- Fix: for a bug fix.
- Update: for a backwards-compatible enhancement.
- Breaking: for a backwards-incompatible enhancement.
- Docs: changes to documentation only.
- Build: changes to build process only.
- New: implemented a new feature.
- Upgrade: for a dependency upgrade.

## Found a problem ?

Please open an issue or submit a PR, we will be more than happy to help

## How to install ?

    npm install ilenia
    // or
    yarn add ilenia

The library only builds es modules and has full tree shaking capability.

## Using the library

1. Wrap your app with the `LocalizationProvider` and pass current `locale`, `translations` and `fallbackTranslations`. Translations and fallbackTranslations are merged into one object for consumers of the components in this library and `withTranslations`.

```javascript
import { LocalizationProvider, Text } from 'ilenia'

const locale = 'en-GB'
const enGB = {
  'header': 'Localised React app',
  'welcomeMessage': 'Welcome to this website!'
}
const enUS = {
  'body': 'Localization is fun!'
}

const App = () => ({
  <LocalizationProvider locale={locale} translations={enGB} fallbackTranslations={enUS}>
    <div className="app">
      <Text id="welcomeMessage"/>
    </div>
  </LocalizationProvider>
})
```

## Components

### Text

Use the `<Text>` component to translate a string in place.
See how to about interpolate [here](#interpolate)

```javascript
import { Text } from "ilenia";

const translations = {
  header: "This is the header of our site",
  greeting: "Welcome to {name}"
};

const interpolations = {
  name: "Trustpilot"
};

const Header = () => (
  <div>
    <h1>
      <Text id="header" />
    </h1>
    <p>
      <Text id="greeting" interpolations={interpolations} />
    </p>
  </div>
);
```

### LinkText

Use `<LinkText>` to render a string with links in it. Any properties added to the link object will be added to the link element that is created.

```javascript
import { LinkText } from "ilenia";

const translations = {
  footer: "Please check out or [LINK-BEGIN]awesome blog[LINK-END]"
};

const App = () => (
  <LinkText
    id="footer"
    links={[{ href: "https://tech.trustpilot.com/" }]}
  />
);
```

Or if your link has different tokens:

```javascript
import { LinkText } from "ilenia";

const translations = {
  footer: "Please check out or {mylink}awesome blog{/mylink}"
};

const App = () => (
  <LinkText
    id="footer"
    links={[
      {
        href: "https://tech.trustpilot.com/",
        start: "{mylink}",
        end: "{/mylink}"
      }
    ]}
  />
);
```

It's possible to add click handlers to the created links as well (eg. a tracking event)

```javascript
import { LinkText } from "ilenia";

const translations = {
  bodyText: "Click here to [LINK-BEGIN]read more[LINK-END]"
};

const link = {
  href: "https://tech.trustpilot.com/",
  onClick: () => analytics.track()
};

const App = () => <LinkText id="bodyText" links={[link]} />;
```

### HtmlText

Use the `<HtmlText>` component to translate a string with html in it.
See how to about interpolate [here](#interpolate)

```javascript
import { HtmlText } from "ilenia";

const translations = {
  header: "This is the {html1}header{html2} of our site",
  footer: "The HTML can also be kept <em>in the string</em>."
};

const interpolations = {
  html1: "<b>",
  html2: "</b>"
};

const Header = () => (
  <div>
    <h1>
      <HtmlText id="header" interpolations={interpolations} />
    </h1>
    <p>
      <HtmlText id="footer" />
    </p>
  </div>
);
```

### LocaleNumber

Use the `<LocaleNumber>` component to localize a number.
Set the decimal places with `maxDecimals`, truncates zeros.

```javascript
import { LocaleNumber } from "ilenia";

<LocaleNumber number={1000000} />
<LocaleNumber number={142.069} maxDecimals={2} />
```

## LocaleDate

Used for rendering a date in a localized format. Uses `toLocaleDateString` behind the scenes, using the `locale` from the provider.

```javascript
import { LocaleDate } from "@trustpilot/react-localization";

<LocaleDate date={new Date()} />; // renders something like 21/9/2018 depending on the locale
```

It is also possible to specify formating options

```javascript
import { LocaleDate } from "@trustpilot/react-localization";

<LocaleDate
  date={new Date()}
  format={{
    day: "numeric",
    month: "short",
    year: "numeric"
  }}
/>; // renders something like Sep 21, 2018 depending on the locale
```

### TimeAgo

Use this component for relative dates (1 year ago, 2 minutes ago etc.)

```javascript
import { TimeAgo } from '@trustpilot/react-localization';

const date = new Date(2018, 1, 15)
<TimeAgo date={date}/> // renders someting like "6 months ago"
```

### withTranslations

To get access to raw translations data or the current locale in a component, use the `withTranslations` HOC:

```javascript
const TextRenderer = ({
  locale,
  translations,
  isFirstVisit,
  visitorNumber
}) => {
  const stringToRender = isFirstVisit
    ? translations["welcomeFirstVisit"]
    : translations["welcomeBack"];
  const visitorNumberDisplay = visitorNumber.toLocaleString(locale);
  return (
    <WelcomeMessage
      message={stringToRender}
      numberDisplay={visitorNumberDisplay}
    />
  );
};

export default withTranslations(TextRenderer);
```

### Interpolate

An `interpolate` function is exposed from this library. This function can be used to replace tokens in a translation string. The components in the library use this function internally. The interpolate function is meant to be used with the `withTranslations` HOC. It returns an array of React elements, there will only be one element in the result if your interpolation items are strings but it can have multiple elements if you are interpolating React components.

```js
import { interpolate } from "ilenia";

let output = interpolate("Value with a {token} in it", { token: "cookie" });
<p>{output}</p>;

output = interpolate("Value with a {component} in it", {
  component: <LocaleNumber number={123.25} />
});
<p>{output}</p>;
```

If you use a different placeholder syntax in your translations object, you can use the optional argument `tag`:

```javascript
import { interpolate } from "ilenia";

const inputString = "This is the [[html1]]header[[html2]] of our site";

const interpolations = {
  html1: "<b>",
  html2: "</b>"
};

const tag = {
  start: "[[",
  end: "]]"
};

const [finishedString] = interpolate(inputString, interpolations, tag);

console.log(finishedString); // logs 'This is the <b>header</b> of our site'
```

The examples above describe <Text> and <HtmlText> as well. The difference is, that the variables are sent as props instead of function arguments:

```js
<Text id="string" interpolations={interpolationsObject} tag={tags}/>
<HtmlText id="string" interpolations={interpolationsObject} tag={tags}/>
```
