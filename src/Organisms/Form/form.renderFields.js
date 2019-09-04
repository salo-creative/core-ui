import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Input from '../../Forms/Input';

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
      name,
      placeholder,
      required
    } = field;

    const { value, error } = get(values, field.name, { value: '', error: true });
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : 'Field invalid';

    switch (field.type) {
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

RenderFields.defaultProps = { disabled: false };

RenderFields.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.array.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};

export default RenderFields;