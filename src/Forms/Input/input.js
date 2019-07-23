import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { InputWrapper, Field, FieldWrapper } from './input.styles';
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
    className,
    disabled,
    error,
    errorMessage,
    fontSize,
    helperText,
    label,
    margin,
    name,
    onBlur,
    onChange,
    onKeyUp,
    padding,
    placeholder,
    required,
    showStrength,
    size,
    type,
    value,
    border,
    borderRadius
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
    <InputWrapper margin={ margin } className={ `salo-input ${ className }` }>
      <Label
        error={ error }
        label={ label }
        name={ name }
        required={ required }
        size={ size }
        className='salo-input__label'
      />
      <FieldWrapper className='salo-input__wrapper'>
        <Field
          aria-required={ required.toString() }
          aria-invalid={ error.toString() }
          background={ background }
          border={ border }
          borderRadius={ borderRadius }
          className='salo-input__field'
          disabled={ disabled }
          error={ error }
          fontSize={ fontSize }
          height={ height() }
          id={ name }
          name={ name }
          onBlur={ (e) => onBlur({ e, value: sanitize(e.target.value) }) }
          onChange={ (e) => onChange({ e, value: sanitize(e.target.value) }) }
          onKeyUp={ (e) => onKeyUp({ e, value: sanitize(e.target.value) }) }
          padding={ padding }
          placeholder={ placeholder }
          type={ type }
          value={ value }
        />
      </FieldWrapper>
      <ErrorText
        className='salo-input__error'
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-input__helper'
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
      { type === 'password' && showStrength && (<Strength value={ value } className='salo-input__strength' />) }
    </InputWrapper>
  );
};

Input.defaultProps = {
  background: colours.paleGrey,
  border: '1px solid',
  borderRadius: '0.4rem',
  className: '',
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  fontSize: '1.4rem',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  onBlur: () => null,
  onChange: () => null,
  onKeyUp: () => null,
  padding: '0 1rem',
  placeholder: '',
  required: false,
  showStrength: false,
  size: 'M',
  type: 'text',
  value: ''
};

Input.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fontSize: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  padding: PropTypes.string,
  placeholder: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  required: PropTypes.bool,
  showStrength: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  type: PropTypes.oneOf(['text', 'email', 'tel', 'number', 'password', 'chat']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;