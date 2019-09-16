import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Address from '../../Forms/Address';
import CheckBox from '../../Forms/CheckBox';
import Input from '../../Forms/Input';
import Radio from '../../Forms/Radio';
import Select from '../../Forms/Select';
import TextArea from '../../Forms/TextArea';
import TypeAhead from '../../Forms/TypeAhead';
import Upload from '../../Forms/Upload';

// HELPERS & CONSTANTS
import { evaluateValue } from '../../Forms/useFormData/useFormData.helpers';

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
    CustomAddress,
    CustomCheckBox,
    CustomInput,
    CustomRadio,
    CustomSelect,
    CustomTextArea,
    CustomTypeAhead,
    CustomUpload
  } = props;

  return fields.map(field => {
    const {
      label,
      name,
      options,
      meta,
      placeholder,
      type,
      validation: { required }
    } = field;
    
    const { value, error } = get(values, field.name, { value: evaluateValue(field), error: true });
    // Grab any errors
    const hasError = !!error && showErrors;
    const errorMessage = typeof error === 'string' ? error : 'Field invalid';
    // Grab the meta info from the form
    const metaData = meta && typeof meta === 'string' ? JSON.parse(meta) : {};

    switch (type) {
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
        const typeahead = typeaheads[name];
        console.log({ error, errorMessage });
        return (
          <FormTypeAhead
            add={ typeahead.add }
            debounced
            disabled={ disabled }
            error={ error }
            errorMessage={ errorMessage }
            key={ name }
            label={ label }
            name={ name }
            onChange={ ({ value: val }) => {
              handleChange({ key: name, value: val });
              if (typeof typeahead.callback === 'function') {
                typeahead.callback({ key: name, value: val });
              }
            } }
            onSelect={ (val) => handleBlur({ key: name, value: val.map((v) => v.id) }) }
            retryAction={ typeahead.retryAction }
            required={ required }
            suggestions={ typeahead.suggestions }
          />
        );
      }
      case 'textarea': {
        const FormTextArea = CustomTextArea || TextArea;
        return (
          <FormTextArea
            countTo={ metaData.countTo }
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
            type={ type }
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
            { options.map(option => (
              <option
                key={ option.value }
                value={ option.value }
              >{ option.label }
              </option>
            )) }
          </FormSelect>
        );
      }
      case 'checkbox': {
        // Evaluate the component to use
        const FormCheckbox = CustomCheckBox || CheckBox;
        return (
          <FormCheckbox
            checked={ value }
            error={ hasError }
            errorMessage={ errorMessage }
            disabled={ disabled }
            key={ name }
            label={ label }
            name={ name }
            onChange={ ({ checked }) => handleBlur({ key: name, value: checked }) }
            required={ required }
          />
        );
      }
      case 'radio': {
        // Evaluate the component to use
        const FormRadio = CustomRadio || Radio;
        return (
          <FormRadio
            error={ hasError }
            errorMessage={ errorMessage }
            disabled={ disabled }
            key={ name }
            label={ label }
            name={ name }
            onChange={ (val) => handleBlur({ key: name, value: val }) }
            options={ options }
            required={ required }
            value={ value }
          />
        );
      }
      case 'address': {
        // Evaluate the component to use
        const FormAddress = CustomAddress || Address;
        return (
          <FormAddress
            error={ hasError }
            disabled={ disabled }
            fields={ get(metaData, 'fields', ['line2', 'county']) }
            key={ name }
            name={ name }
            onChange={ (val) => handleBlur({ key: name, value: val }) }
            required={ required }
            value={ value }
          />
        );
      }
      default:
        return <p key={ name }>The supplied field type is invalid</p>;
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