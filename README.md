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


3. Use the `<LinkString>` component to render strings with links in them.

Using following translations object:

`const translations = {
  'footer': 'Please check out or [LINK-BEGIN]awesome blog[LINK-END]'
}`

... the `<LinkString` can be used like this:

```javascript
import { LinkString } from '@trustpilot/react-localization'

const Footer = () => {
  return <div className="footer">
    <LinkString string="footer" links={[ { href: 'https://tech.trustpilot.com/' } ]}
  </div>
}
