import React from 'react';
import PropTypes from 'prop-types';
import withTranslations from '../withTranslations';
import { interpolate } from '../../utils/interpolations';

const HtmlText = ({ id, interpolations = {}, translations = {}, tag }) => {
  let string = translations[id];
  if (!string) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }

  string = interpolate(string, interpolations, tag);

  return (<span dangerouslySetInnerHTML={{__html: string}}/>); // eslint-disable-line react/no-danger
};

HtmlText.propTypes = {
  id: PropTypes.string.isRequired,
  interpolations: PropTypes.objectOf(PropTypes.string),
  tag: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
};

export default withTranslations(HtmlText);
