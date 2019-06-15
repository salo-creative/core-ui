import React from 'react';
import PropTypes from 'prop-types';

import { TextAreaWrapper, Field } from './textArea.styles';
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const TextArea = props => {
  const {
    background,
    disabled,
    error,
    errorMessage,
    helperText,
    label,
    margin,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required,
    value,
    rows,
    size
  } = props;

  return (
    <TextAreaWrapper margin={ margin }>
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
      />
      <Field
        aria-required={ required.toString() }
        aria-invalid={ error.toString() }
        background={ background }
        disabled={ disabled }
        id={ name }
        onBlur={ e => onBlur({ e, value: e.target.value }) }
        onChange={ e => onChange({ e, value: e.target.value }) }
        onFocus={ e => onFocus({ e, value: e.target.value }) }
        placeholder={ placeholder }
        rows={ rows }
        value={ value }
      />
      <ErrorText
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </TextAreaWrapper>
  );
};

TextArea.defaultProps = {
  background: colours.grey,
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null,
  placeholder: '',
  required: false,
  value: '',
  rows: 3,
  size: 'M'
};

TextArea.propTypes = {
  background: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['L', 'M'])
};

export default TextArea;