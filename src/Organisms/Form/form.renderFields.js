import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, forEach, map } from 'lodash';
import styled from 'styled-components';

// COMPONENTS & STYLES
import Address from '../../Forms/Address';
import CheckBox from '../../Forms/CheckBox';
import Input from '../../Forms/Input';
import Password from '../../Forms/Password';
import Radio from '../../Forms/Radio';
import Select from '../../Forms/Select';
import TextArea from '../../Forms/TextArea';
import TypeAhead from '../../Forms/TypeAhead';
import Upload from '../../Forms/Upload';
import P from '../../Typography/P';

// HELPERS & CONSTANTS
import { evaluateValue } from '../../Forms/useFormData/useFormData.helpers';

const Row = styled.div`
  @media only screen and (min-width: 720px) {
    display: flex;
    justify-content: space-between;

    > * {
      width: 100%;
    }
    
    > *:not(:first-child) {
      margin-left: 2rem;
    }
  }
`;

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
    CustomCopy,
    CustomInput,
    Link,
    CustomPassword,
    CustomRadio,
    CustomSelect,
    CustomTextArea,
    CustomTypeAhead,
    CustomUpload
  } = props;

  const groups = {};

  const hydratedFields = fields.map((field, index) => {
    const {
      label,
      name,
      options,
      meta,
      placeholder,
      type,
      validation: { required, max }
    } = field;
    
    const { value, error } = get(values, field.name, {
      value: evaluateValue(field),
      error: true
    });
    // Grab any errors
    const hasError = !!error && showErrors;
    const errorMessage = typeof error === 'string' ? error.replace(name, label || name) : 'Field invalid';
    // Grab the meta info from the form
    const metaData = meta && typeof meta === 'string' ? JSON.parse(meta) : {};
    
    if (metaData.group) {
      // If this field has a grouping then add it to the hash.
      groups[metaData.group] = groups[metaData.group] ? [...groups[metaData.group], index] : [index];
    }

    switch (type) {
      case 'file': {
        // Evaluate the component to use
        const FormUpload = CustomUpload || Upload;
        return (
          <FormUpload
            accept={ field.validation.enum }
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
        return (
          <FormTypeAhead
            debounced
            disabled={ disabled }
            error={ hasError }
            errorMessage={ errorMessage }
            key={ name }
            label={ label }
            max={ max }
            name={ name }
            onChange={ ({ value: val }) => {
              handleChange({ key: name, value: val });
              if (typeof typeahead.callback === 'function') {
                typeahead.callback({ key: name, value: val });
              }
            } }
            onSelect={ (val) => handleBlur({ key: name, value: val.map((v) => v.id) }) }
            required={ required }
            value={ values[name] }
            { ...typeahead }
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
      case 'currentPassword':
      case 'email':
      case 'number':
      case 'tel':
      case 'text':
      case 'url': {
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
            type={ type === 'currentPassword' ? 'password' : type }
            value={ value }
          />
        );
      }
      case 'password': {
        // Evaluate the component to use
        const FormPassword = CustomPassword || Password;
        return (
          <FormPassword
            error={ hasError }
            disabled={ disabled }
            key={ name }
            name={ name }
            onChange={ (val) => handleBlur({ key: name, value: val }) }
            required={ required }
            value={ value }
            // Custom components
            Input={ CustomInput || Input }
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
            customLabel={ metaData }
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
            // Custom components
            Input={ CustomInput || Input }
          />
        );
      }
      case 'copy': {
        // Evaluate the component to use
        const FormCopy = CustomCopy || P;

        if (isEmpty(metaData.copy)) {
          return null;
        }

        return (
          <div className={ `salo-form__copy salo-form__copy--${ name }` } key={ name }>
            {
              metaData.copy.map((item) => {
                if (item.type === 'link') {
                  return (
                    <FormCopy key={ item.text.slice(0, 10) }>
                      <Link to={ item.link } target='_blank'>
                        { item.text }
                      </Link>
                    </FormCopy>
                  );
                }

                return <FormCopy key={ item.text.slice(0, 10) }>{ item.text }</FormCopy>;
              })
            }
          </div>
        );
      }
      default:
        return <p key={ name }>The supplied field type `{ type }` is invalid</p>;
    }
  });

  // We now have a 1:1 list of fields and components which is great unless we need to do additional layout.
  // We check here so we can easily bail out of this extra work.
  if (Object.keys(groups).length) {
    // 1. Find which component has a group.
    // 2. Add a Row around all the components in a group
    // 3. Splice old components out of hydratedFields
    // 4. Insert back into array

    // Create a copy so we don't mutate the actual array and lose indexes.
    let newFields = hydratedFields.slice(0);
    forEach(groups, (value, key) => {
      // Get a reference to all of the components.
      // NB. this could be bypassed if we rejigged the above to not return
      // but I want to keep this bit encapsulated for now.
      const components = map(value, (v) => hydratedFields[v]);

      // Group it in a row.
      const groupedFields = (
        <Row key={ key }>{ components }</Row>
      );

      // Add the row back to the array in the correct place.
      // NB. groups must be contiguous.
      newFields = [
        ...newFields.slice(0, value[0]),
        groupedFields,
        ...newFields.slice(value[value.length - 1] + 1)
      ];
    });
    return newFields;
  }

  return hydratedFields;
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