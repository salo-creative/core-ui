import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Input from '../../Forms/Input';
import Select from '../../Forms/Select';

const RenderFields = (props) => {
  const {
    disabled,
    fields,
    handleBlur,
    handleChange,
    showErrors,
    values,
    // Custom components
    CustomInput,
    CustomSelect
  } = props;

  return fields.map(field => {
    const {
      label,
      name,
      placeholder,
      required
    } = field;

    const { value, error } = get(values, field.name, { value: '', error: true });
    const hasError = !!error && showErrors;
    const errorMessage = typeof error === 'string' ? error : 'Field invalid';

    switch (field.type) {
      case 'text':
      case 'url':
      case 'email':
      case 'tel':
      case 'number': {
        const inputProps = {
          error: hasError,
          errorMessage,
          disabled,
          key: name,
          label,
          name,
          onBlur: ({ value: val }) => handleBlur({ key: name, value: val }),
          onKeyUp: ({ e, value: val }) => {
          // This is needed to trigger field validation when return is pressed to submit
            if (e.keyCode === 13) {
              handleBlur({ key: name, value: val });
            }
          },
          onChange: ({ value: val }) => handleChange({ key: name, value: val }),
          placeholder,
          required,
          type: field.type,
          value
        };

        // Return component
        return CustomInput ? <CustomInput { ...inputProps } /> : <Input { ...inputProps } />; // eslint-disable-line react/jsx-props-no-spreading
      }
      case 'select': {
        // Evaluate the component to use
        const FormSelect = CustomSelect || Select;

        // Return component
        return (
          <FormSelect
            error={ hasError }
            errorMessage={ errorMessage }
            disabled={ disabled }
            key={ name }
            label={ label }
            name={ name }
            onChange={ ({ value: val }) => handleBlur({ key: name, value: val }) }
            placeholder={ placeholder }
            required={ required }
            value={ value }
          >
            <option value=''>Please select…</option>
            { field.options.map(option => (
              <option
                key={ option.value }
                value={ option.value }
              >{ option.label }
              </option>
            )) }
          </FormSelect>
        ); // eslint-disable-line react/jsx-props-no-spreading
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