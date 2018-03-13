# React localization

*Trustpilot style*

## Table of contents

- [Using the module](#using-the-module)
- [Components](#components)
  - [Text](#text)
  - [LinkText](#linktext)
  - [HtmlText](#htmltext)
  - [withTranslations](#withtranslations)
  - [Interpolate](#interpolate)


## Using the module

1. Wrap your app with the `LocalizationProvider` and pass current `locale`, `translations` and `fallbackTranslations`. Translations and fallbackTranslations are merged into one object for consumers of the components in this library and `withTranslations`.

```javascript
import { LocalizationProvider, Text } from '@trustpilot/react-localization'

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

```javascript
import { Text } from '@trustpilot/react-localization'

const translations = {
  'header': 'This is the header of our site',
  'greeting': 'Welcome to {name}'
};

const interpolations = {
  'name': 'Trustpilot'
};

const Header = () => (
  <div>
    <h1><Text id="header"/></h1>
    <p><Text id="greeting" interpolations={interpolations}/></p>
  </div>
);
```


### LinkText

Use `<LinkText>` to render a string with links in it.

```javascript
import { LinkText } from '@trustpilot/react-localization'

const translations = {
  'footer': 'Please check out or [LINK-BEGIN]awesome blog[LINK-END]'
};

const App = () => (
  <LinkText string="welcomeMessage" links={[ { href: 'https://tech.trustpilot.com/' } ]} />
);
```

Or if your link has different tokens:

```javascript
import { LinkText } from '@trustpilot/react-localization'

const translations = {
  'footer': 'Please check out or {mylink}awesome blog{/mylink}'
};

const App = () => (
  <LinkText string="welcomeMessage" links={[ { href: 'https://tech.trustpilot.com/', start: '{mylink}', end: '{/mylink}' } ]} />
);
```

### HtmlText

Use the `<HtmlText>` component to translate a string with html in it.

```javascript
import { HtmlText } from '@trustpilot/react-localization'

const translations = {
  'header': 'This is the {html1}header{html2} of our site',
  'footer': 'The HTML can also be kept <em>in the string</em>.'
};

const interpolations = {
  html1: '<b>',
  html2: '</b>'
};

const Header = () => (
  <div>
    <h1><HtmlText id="header" interpolations={interpolations}/></h1>
    <p><HtmlText id="footer"/></p>
  </div>
);
```


### withTranslations

To get access to raw translations data or the current locale in a component, use the `withTranslations` HOC:


```javascript

const TextRenderer = ({ locale, translations, isFirstVisit, visitorNumber }) => {
  const stringToRender = isFirstVisit ? translations['welcomeFirstVisit'] : translations['welcomeBack'];
  const visitorNumberDisplay = visitorNumber.toLocaleString(locale);
  return (<WelcomeMessage message={stringToRender} numberDisplay={visitorNumberDisplay} />);
};

export default withTranslations(TextRenderer);
```


### Interpolate

An `interpolate` function is exposed from this library. This function can be used to replace tokens in a translation string. The components in the library use this function internally. The interpolate function is meant to be used with the `withTranslations` HOC.

```js
import { interpolate } from '@trustpilot/react-localization';

const finishedString = interpolate('Value with a {token} in it', { token: 'cookie' });
console.log(finishedString); // logs 'Value with a cookie in it'
```

If you use a different placeholder syntax in your translations object, you can use the optional argument `tag`:

```javascript
import { interpolate } from '@trustpilot/react-localization'

const inputString = 'This is the [[html1]]header[[html2]] of our site';

const interpolations = {
  html1: '<b>',
  html2: '</b>'
};

const tag = {
  start:'[[',
  end:']]'
};

const finishedString = interpolate(inputString, interpolations, tag);

console.log(finishedString); // logs 'This is the <b>header</b> of our site'
```


The examples above describe <Text> and <HtmlText> as well. The difference is, that the variables are sent as props instead of function arguments:

```js
<Text id="string" interpolations={interpolationsObject} tag={tags}/>
<HtmlText id="string" interpolations={interpolationsObject} tag={tags}/>
```
