import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Input from '../../Forms/Input';
import Select from '../../Forms/Select';
import TextArea from '../../Forms/TextArea';
import TypeAhead from '../../Forms/TypeAhead';
import Upload from '../../Forms/Upload';

const RenderFields = (props) => {
  const {
    disabled,
    fields,
    handleBlur,
    handleChange,
    showErrors,
    typeaheads,
    values,
    // Custom components
    CustomInput,
    CustomSelect,
    CustomTextArea,
    CustomTypeAhead,
    CustomUpload
  } = props;

  return fields.map(field => {
    const {
      label,
      name,
      placeholder,
      validation: { required }
    } = field;
    
    const { value, error } = get(values, field.name, { value: '', error: true });
    const hasError = !!error && showErrors;
    const errorMessage = typeof error === 'string' ? error : 'Field invalid';

    switch (field.type) {
      case 'file': {
        // Evaluate the component to use
        const FormUpload = CustomUpload || Upload;
        return (
          <FormUpload
            error={ hasError }
            errorMessage={ errorMessage }
            key={ name }
            label={ label }
            name={ name }
            onChange={ ({ value: val }) => {
              handleBlur({ key: name, value: val });
            } }
            type='file'
          />
        );
      }
      case 'typeahead': {
        const FormTypeAhead = CustomTypeAhead || TypeAhead;
        return (
          <FormTypeAhead
            disabled={ disabled }
            error={ error }
            errorMessage={ errorMessage }
            key={ name }
            label={ label }
            name={ name }
            onChange={ ({ value: val }) => handleChange({ key: name, value: val }) }
            onSelect={ (val) => handleBlur({ key: name, value: val }) }
            retryAction={ typeaheads[name].retryAction }
            required={ required }
            suggestions={ typeaheads[name].suggestions }
          />
        );
      }
      case 'textarea': {
        const FormTextArea = CustomTextArea || TextArea;
        const meta = typeof field.meta === 'string' ? JSON.parse(field.meta) : {};
        return (
          <FormTextArea
            countTo={ meta.countTo }
            error={ hasError }
            errorMessage={ errorMessage }
            disabled={ disabled }
            key={ name }
            label={ label }
            max={ field.validation.max }
            min={ field.validation.min }
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
      case 'text':
      case 'url':
      case 'email':
      case 'tel':
      case 'number': {
        // Evaluate the component to use
        const FormInput = CustomInput || Input;

        return (
          <FormInput
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
      case 'select': {
        // Evaluate the component to use
        const FormSelect = CustomSelect || Select;

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
        );
      }
      default:
        return <p>The supplied field type is invalid</p>;
    }
  });
};

RenderFields.defaultProps = {
  disabled: false,
  typeaheads: null,
  values: {}
};

RenderFields.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.array.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  typeaheads: PropTypes.object,
  values: PropTypes.object
};

export default RenderFields;