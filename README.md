# React localization

*Trustpilot style*


## Using the module

1. Wrap your app with the `LocalizationProvider` and pass current `locale` and `translations`. Translations should be a flat object with key/value pairs.

```javascript
import { LocalizationProvider } from '@trustpilot/react-localization'

const locale = 'en-US'
const translations = {
  'header': 'Localized React app',
  'welcomeMessage': 'Welcome to this website!'
}

const App = () => ({
  <LocalizationProvider locale={locale} translations={translations}>
    <div className="app">
      ... Your app goes here
    </div>
  </LocalizationProvider>
})
```

2. Components in the tree below the `LocalizationProvider` can now access the translations by using the higher-order-component `withTranslations`:

```javascript
import { LocalizationProvider } from '@trustpilot/react-localization'

const Header = withTranslations(({ locale, translations }) => {
  return <h1>{translations.header}</h1>
})
```


3. Use the `<LinkText>` component to render strings with links in them.

Using following translations object:

`const translations = {
  'footer': 'Please check out or [LINK-BEGIN]awesome blog[LINK-END]'
}`

... the `<LinkText>` can be used like this:

```javascript
import { LinkText } from '@trustpilot/react-localization'

const Footer = () => {
  return <div className="footer">
    <LinkText string="footer" links={[ { href: 'https://tech.trustpilot.com/' } ]}
  </div>
}
```

4. Use the `<Text>` component to translate a string in place.

Using following translations object:

`const translations = {
  'header': 'This is the header of our site',
  'greeting': 'Hello {name}'
}`

and interpolations object:

`const interpolations = {
  'name': () => {return 'Trustpilot'}
}`

... the `<Text>` can be used like this:

```javascript
import { Text } from '@trustpilot/react-localization'

const Header = (
  <h1><Text id="header"/></h1>
  <p><Text id="greeting" interpolations={interpolations}/></p>
)
})
```

5. Use the `<HtmlText>` component to translate a string with html in it.

Using following translations object:

`const translations = {
  'header': 'This is the {html1}header{html2} of our site',
}`

and interpolations object:

`const interpolations = {
  html1: '<b>',
  html2: '</b>'
}`

... the `<HtmlText>` can be used like this:

```javascript
import { HtmlText } from '@trustpilot/react-localization'

const Header = (
  <h1><HtmlText id="header" interpolations={interpolations}/></h1>
)
})
```

If you use a different placeholder syntax in your translations object, you can use the optional argument `tag` in the `Text` and `HtmlText` components, like this:

Using following translations object:

`const translations = {
  'header': 'This is the [[html1]]header[[html2]] of our site',
}`

and interpolations object:

`const interpolations = {
  html1: '<b>',
  html2: '</b>'
}`

```javascript
import { Text } from '@trustpilot/react-localization'

const Header = (
  <h1><Text id="header" interpolations={interpolations} tag={ {start:'[[', end:']]'} }/></h1>
)
})
```
