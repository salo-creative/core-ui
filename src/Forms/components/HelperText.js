import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// STYLES
const Text = styled.p`
  font-size: ${ ({ size }) => (size === 'L' ? '1.2rem' : '1rem') };
  margin: 0.5rem 0 0;
  padding: 0;
  color: ${ ({ theme }) => theme.darkGrey };
`;

const HelperText = (props) => {
  const { disabled, error, helperText, size } = props;
  if (!helperText || (error && !disabled)) return null;
  return (
    <Text size={ size }>
      { helperText }
    </Text>
  );
};

HelperText.defaultProps = { helperText: '' };

HelperText.propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  size: PropTypes.string.isRequired
};

export default HelperText;