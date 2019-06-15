import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// STYLES
const StyledLabel = styled.label`
  font-size: ${ ({ size }) => (size === 'L' ? '1.6rem' : '1.4rem') };
  margin: 0 0 0.5rem;
  padding: 0;
  color: ${ ({ error, theme }) => (error ? theme.red : 'inherit') };
  word-break: break-word;
`;

const Label = (props) => {
  const { error, label, name, size, required } = props;
  if (!label) return null;
  return (
    <StyledLabel
      error={ error }
      htmlFor={ name }
      size={ size }
    >
      { label }{ required && <sup data-testid='required'>*</sup> } :
    </StyledLabel>
  );
};

Label.defaultProps = { label: '' };

Label.propTypes = {
  error: PropTypes.bool.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired
};

export default Label;