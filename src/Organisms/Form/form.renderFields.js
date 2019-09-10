import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Input from '../../Forms/Input';
import Upload from '../../Forms/Upload';

const RenderFields = (props) => {
  const {
    disabled,
    fields,
    handleBlur,
    handleChange,
    showErrors,
    values
  } = props;

  return fields.map(field => {
    const {
      label,
      meta = {},
      name,
      placeholder,
      required
    } = field;
    
    const { value, error } = get(values, field.name, { value: '', error: true });
    const hasError = !!error && showErrors;
    const errorMessage = typeof error === 'string' ? error : 'Field invalid';
    const metadata = JSON.parse(meta);

    switch (field.type) {
      case 'file':
        return (
          <Upload
            accept={ metadata.accept }
            error={ hasError }
            errorMessage={ errorMessage }
            key={ name }
            label={ label }
            maxSize={ metadata.maxSize }
            multiple={ metadata.multiple }
            name={ name }
            onChange={ ({ value: val }) => {
              handleBlur({ key: name, value: val });
            } }
            type='file'
          />
        );
      case 'text':
      case 'url':
      case 'email':
      case 'tel':
      case 'number': {
        return (
          <Input
            error={ hasError }
            errorMessage={ errorMessage }
            disabled={ disabled }
            key={ name }
            label={ label }
            name={ name }
            onBlur={ ({ value: val }) => handleBlur({ key: name, value: val }) }
            onKeyUp={ ({ e, value: val }) => {
              // This is needed to trigger field validation when return is pressed to submit
              if (e.keyCode === 13) {
                handleBlur({ key: name, value: val });
              }
            } }
            onChange={ ({ value: val }) => handleChange({ key: name, value: val }) }
            placeholder={ placeholder }
            required={ required }
            type={ field.type }
            value={ value }
          />
        );
      }
      default:
        return <p>The supplied field type is invalid</p>;
    }
  });
};

RenderFields.defaultProps = {
  disabled: false,
  values: {}
};

RenderFields.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.array.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default RenderFields;