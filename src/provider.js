import { Component } from 'react';
import PropTypes from 'prop-types';

class LocalizationProvider extends Component {
  getChildContext() {
    return {
      locale: this.props.locale,
      translations: this.props.translations
    };
  }

  render() {
    return this.props.children;
  }
}


LocalizationProvider.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired
};

LocalizationProvider.childContextTypes = {
  locale: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired
};

export default LocalizationProvider;
