import { Component } from 'react';
import PropTypes from 'prop-types';

class LocalizationProvider extends Component {
  getChildContext() {
    return {
      locale: this.props.locale,
      translations: { ...this.props.fallbackTranslations, ...this.props.translations },
    };
  }

  render() {
    return this.props.children;
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    locale: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    fallbackTranslations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static childContextTypes = {
    locale: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
}

export default LocalizationProvider;
