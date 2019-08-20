/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';

// COMPONENTS
import { InputWrapper, HiddenInput } from './upload.styles';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import Label from '../components/Label';

// HELPERS
import Button from '../../Molecules/Button';

function getAcceptedTypes(accept) {
  if (isArray(accept)) {
    return accept.reduce((accum, type) => {
      if (type === 'documents') {
        return accum += ',application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } if (type === 'images') {
        return accum += ',image/png,image/jpeg';
      } if (type === 'data') {
        return accum += ',text/csv';
      }
      return accum;
    }, '');
  }
  return accept;
}

const Upload = (props) => {
  const {
    accept,
    capture,
    className,
    children,
    disabled,
    error,
    errorMessage,
    files,
    fontSize,
    helperText,
    label,
    margin,
    multiple,
    name,
    onBlur,
    onChange,
    placeholder,
    required,
    size,
    showLabel
  } = props;

  const inputRef = React.useRef(null);
  const accepted = getAcceptedTypes(accept);

  const renderTrigger = () => {
    if (typeof children === 'function') {
      return children({
        ...props,
        inputRef
      });
    } if (children) {
      return (
        <label htmlFor={ name }>
          { children }
        </label>
      );
    }
    return (
      <Button
        type='label'
        htmlFor={ name }
        id={ `${ name }_label` }
        error={ error }
        label={ label }
        name={ name }
        disabled={ disabled }
        required={ required }
        size={ size }
        className='salo-upload__label'
      >
        { placeholder }
      </Button>
    );
  };

  return (
    <InputWrapper margin={ margin } className={ `salo-upload ${ className }` }>
      { showLabel && (
        <Label
          error={ error }
          label={ label }
          name={ name }
          required={ required }
          size={ size }
          className='salo-input__label'
        />
      ) }
      { renderTrigger() }
      <HiddenInput
        type='file'
        ref={ inputRef }
        aria-required={ required.toString() }
        aria-invalid={ error.toString() }
        accept={ accepted }
        capture={ capture }
        className='salo-upload__field'
        disabled={ disabled }
        files={ files }
        fontSize={ fontSize }
        id={ name }
        multiple={ multiple }
        name={ name }
        onBlur={ (e) => onBlur({ e, value: multiple ? e.target.files : e.target.files[0] }) }
        onChange={ (e) => onChange({ e, value: multiple ? e.target.files : e.target.files[0] }) }
      />
      <ErrorText
        className='salo-upload__error'
        disabled={ disabled }
        error={ error }
        errorMessage={ errorMessage }
        size={ size }
      />
      <HelperText
        className='salo-upload__helper'
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        size={ size }
      />
    </InputWrapper>
  );
};

Upload.defaultProps = {
  accept: '*',
  capture: '',
  className: '',
  children: null,
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  files: null,
  fontSize: '1.4rem',
  helperText: '',
  label: '',
  margin: '0 0 2rem',
  multiple: false,
  onBlur: () => null,
  onChange: () => null,
  placeholder: 'Choose file',
  required: false,
  showLabel: true,
  size: 'M'
};

Upload.propTypes = {
  accept: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
  capture: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  files: PropTypes.any,
  fontSize: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showLabel: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default Upload;