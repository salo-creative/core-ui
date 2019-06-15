import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// STYLES
const Text = styled.p`
  font-size: ${ ({ size }) => (size === 'L' ? '1.2rem' : '1rem') };
  margin: 0.5rem 0 0;
  padding: 0;
  color: ${ ({ theme }) => theme.error };
`;

const HelperText = (props) => {
  const { disabled, error, errorMessage, size } = props;
  if (!error || disabled) return null;
  return (
    <Text size={ size }>
      { errorMessage }
    </Text>
  );
};

HelperText.propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

export default HelperText;