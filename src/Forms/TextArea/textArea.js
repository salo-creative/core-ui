import React from 'react';
import PropTypes from 'prop-types';

import { TextAreaWrapper, Field } from './textArea.styles';
import Label from '../components/Label';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import Counter from './textArea.counter';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

const TextArea = props => {
  const {
    background,
    className,
    countTo,
    disabled,
    error,
    errorMessage,
    helperText,
    label,
    margin,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required,
    rows,
    size,
    value
  } = props;

  return (
    <TextAreaWrapper margin={ margin } className={ `salo-textarea ${ className }` }>
      <Label
        className='salo-textarea__label'
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
        className='salo-textarea__field'
        disabled={ disabled }
        id={ name }
        maxLength={ max }
        minLength={ min }
        onBlur={ e => onBlur({ e, value: e.target.value }) }
        onChange={ e => onChange({ e, value: e.target.value }) }
        onFocus={ e => onFocus({ e, value: e.target.value }) }
        placeholder={ placeholder }
        rows={ rows }
        value={ value }
      />
      { countTo && (
        <Counter
          countTo={ countTo }
          value={ value }
        />
      ) }
      <ErrorText
        className='salo-textarea__error'
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-textarea__helper'
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
  className: '',
  countTo: null,
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  max: null,
  min: null,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null,
  placeholder: '',
  required: false,
  rows: 3,
  size: 'M',
  value: ''
};

TextArea.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  countTo: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.string
};

export default TextArea;