import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { InputWrapper, Field } from './input.styles';
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import Strength from '../components/Strength';

// HELPERS
import { sanitize } from '../../helpers/form';
import { colours } from '../../helpers/colours';

const Input = (props) => {
  const {
    background,
    disabled,
    error,
    errorMessage,
    helperText,
    iconBefore,
    label,
    margin,
    name,
    onBlur,
    onChange,
    onKeyUp,
    placeholder,
    required,
    showStrength,
    size,
    type,
    value
  } = props;

  const height = () => {
    switch (size) {
      case 'M':
        return '4rem';
      case 'L':
      default:
        return '4.5rem';
    }
  };

  return (
    <InputWrapper margin={ margin }>
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
        height={ height() }
        id={ name }
        name={ name }
        onBlur={ (e) => onBlur({ e, value: sanitize(e.target.value) }) }
        onChange={ (e) => onChange({ e, value: sanitize(e.target.value) }) }
        onKeyUp={ (e) => onKeyUp({ e, value: sanitize(e.target.value) }) }
        placeholder={ placeholder }
        type={ type }
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
      { type === 'password' && showStrength && (<Strength value={ value } />) }
    </InputWrapper>
  );
};

Input.defaultProps = {
  background: colours.grey,
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  onChange: () => null,
  onKeyUp: () => null,
  placeholder: '',
  required: false,
  showStrength: false,
  size: 'M',
  type: 'text',
  value: ''
};

Input.propTypes = {
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
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showStrength: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  type: PropTypes.oneOf(['text', 'email', 'tel', 'number', 'password']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;