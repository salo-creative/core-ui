import React from 'react';
import PropTypes from 'prop-types';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const Address = (props) => {
  return null;
};

Address.defaultProps = {
  accept: null,
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  className: '',
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  fields: ['line1', 'line2', 'city', 'county', 'postcode', 'country'],
  fontSize: '1.4rem',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  onChange: () => null,
  onKeyUp: () => null,
  padding: '0 1rem',
  required: false,
  size: 'M',
  value: {}
};

Address.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  capture: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string),
  fontSize: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  padding: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.object
};