import withTranslations from '../';

const locale = 'en-US';
const translations = {
  'test1': 'Just a random string',
};

test('Wrapped component has access to locale and translations as props', () => {
  const mockComponent = () => null;
  const output = withTranslations(mockComponent)({}, {
    locale,
    translations,
  });

  expect(output.props.locale).toBe(locale);
  expect(output.props.translations).not.toBe(null);
  expect(output.props.translations.test1).toBe(translations.test1);
});
