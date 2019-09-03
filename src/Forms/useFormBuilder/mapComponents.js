import React from 'react';
import { isArray } from 'lodash';

import Input from '../Input';
import Button from '../../Molecules/Button';

export default function mapComponents({ fields = [], components = {}, actions }) {
  console.log('mapComp', fields);
  if (!isArray(fields)) {
    return [];
  }
  return fields.map((field) => {
    const onBlur = ({ value }) => actions.handleBlur(field.name, value);
    const onChange = ({ value }) => actions.handleChange(field.name, value);

    switch (field.type) {
      case 'checkbox':
        return components.checkbox ? React.cloneElement(
          components.checkbox,
          ...actions,
          ...field
        ) : (
          <Button
            name={ field.name }
          >
            { field.label }
          </Button>
        );
      
      case 'email':
        return components.email ? React.cloneElement(
          components.email,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );
        
      case 'hidden':
        return components.hidden ? React.cloneElement(
          components.hidden,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );
  
      case 'password':
        return components.password ? React.cloneElement(
          components.password,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );

      case 'radio':
        return components.radio ? React.cloneElement(
          components.radio,
          ...actions,
          ...field
        ) : (
          <Button
            name={ field.name }
          >
            { field.label }
          </Button>
        );

      case 'range':
        return components.range ? React.cloneElement(
          components.range,
          ...actions,
          ...field
        ) : (
          <Button
            name={ field.name }
          >
            { field.label }
          </Button>
        );

      case 'select':
        return components.tel ? React.cloneElement(
          components.tel,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );

      case 'tel':
        return components.tel ? React.cloneElement(
          components.tel,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );
      case 'text':
        return components.text ? React.cloneElement(
          components.text,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );

      case 'textarea':
        return components.textarea ? React.cloneElement(
          components.textarea,
          ...actions,
          ...field
        ) : (
          <Button
            name={ field.name }
          >
            { field.label }
          </Button>
        );
      
      case 'url':
        return components.url ? React.cloneElement(
          components.url,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );

      default:
        return components.default ? React.cloneElement(
          components.default,
          ...actions,
          ...field
        ) : (
          <Input
            key={ field.id }
            label={ field.label }
            name={ field.name }
            onBlur={ onBlur }
            onChange={ onChange }
            placeholder={ field.placeholder }
            required={ field.required }
            type={ field.type }
            value={ field.value }
          />
        );
    }
  });
}