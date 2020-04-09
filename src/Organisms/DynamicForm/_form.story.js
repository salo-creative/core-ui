/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import {
  withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { DynamicForm } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Organisms | Dynamic Form', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));

stories.add(
  'Basic',
  (() => {
    const name = text('name', 'test');
    const renderSteps = boolean('Use stepper', true);
    const showTitles = boolean('Use titles', true);
    const customSubmit = boolean('Use custom submit method', false);
    const resetFormPostSubmit = boolean('Reset after submit', false);
    const hideFormPostSubmit = boolean('Hide after submit', false);
    const prepopulated = boolean('Prepopulate fields', true);
    const showStepCount = boolean('Show step count', false);
    const stepper = select('Stepper', {
      'Full': 'full',
      'Condensed': 'condensed'
    }, 'condensed');
    const position = select('Stepper position', {
      'Above': 'above',
      'Below': 'below'
    }, 'below');
    
    return (
      <DynamicForm
        name={ name }
        options={ {
          hideFormPostSubmit,
          resetFormPostSubmit,
          stepper: {
            renderSteps,
            showTitles,
            type: stepper,
            position,
            showStepCount
          }
        } }
        data={ {
          initialData: prepopulated ? {
            text: 'Rich',
            email: 'rich@test.co.uk',
            url: 'https://salocreative.co.uk',
            tel: '0234234',
            day: new Date(),
            number: 8,
            select: 'option_1',
            checkbox: true,
            radio: 'option_2',
            address: {
              line1: '123 Storybook Lane',
              line2: '456',
              city: 'London',
              postcode: 'W1 A'
            },
            password: 'Pa55w0rd!'
          } : null,
          onSubmit: customSubmit ? ({ data }) => {
            console.log(data);
            alert(JSON.stringify(data, null, 2));
          } : null
        } }
      />
    );
  }), {
    info: {
      propTablesExclude: []
    },
    notes: README
  }
);

// Custom components
const CustomInput = ({
  error,
  errorMessage,
  label,
  onBlur,
  onChange,
  ...props
}) => (
  <React.Fragment>
    <label>{ label }</label>
    <input
      { ...props }
      onBlur={ (e) => onBlur({
        e, value: e.target.value
      }) }
      onChange={ (e) => onChange({
        e, value: e.target.value
      }) }
      onKeyUp={ _ => _ }
    />
    <span>{ error ? errorMessage : '' }</span>
  </React.Fragment>
);

const CustomButton = ({
  children,
  ...props
}) => {
  return <button type='button' { ...props }>{ children }</button>;
};

stories.add(
  'Custom components',
  (() => {
    const name = text('name', 'test');
    const renderSteps = boolean('Use stepper', true);

    return (
      <DynamicForm
        name={ name }
        options={ {
          stepper: {
            renderSteps
          }
        } }
        renderSteps={ renderSteps }
        inputs={ {
          Button: CustomButton,
          Input: CustomInput,
          Upload: CustomInput
        } }
      />
    );
  }), {
    info: {
      propTablesExclude: []
    },
    notes: README
  }
);