import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { Text } from './readOnly.styles';

const ReadOnly = (props) => {
  const {
    label,
    margin,
    name,
    value
  } = props;

  const renderValue = () => {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value.toString();
  };

  return (
    <Text margin={ margin }>
      <strong>{ label || name || 'Label' }:</strong> { renderValue() }
    </Text>
  );
};

ReadOnly.defaultProps = {
  label: '',
  margin: '0 0 2rem',
  name: '',
  value: '-'
};

ReadOnly.propTypes = {
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any
};

export default ReadOnly;