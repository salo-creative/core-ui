import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import {
  withKnobs, text, boolean, select
} from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Form } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const name = text('name', 'test');
  const renderSteps = boolean('Use stepper', true);
  const showTitles = boolean('Use titles', true);
  const stepper = select(
    'Stepper',
    {
      Full: 'full',
      Condensed: 'condensed'
    },
    'condensed'
  );

  return (
    <Form
      name={ name }
      renderSteps={ renderSteps }
      showTitles={ showTitles }
      stepper={ stepper }
      strings={ {} }
    />
  );
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    info: {
      propTablesExclude: []
    },
    notes: README
  }
};

// Custom components
const CustomInput = ({ error, errorMessage, label, onBlur, onChange, ...props }) => (
  <React.Fragment>
    <label>{ label }</label>
    <input
      { ...props }
      onBlur={ e => onBlur({
        e,
        value: e.target.value
      }) }
      onChange={ e => onChange({
        e,
        value: e.target.value
      }) }
      onKeyUp={ _ => _ }
    />
    <span>{ error ? errorMessage : '' }</span>
  </React.Fragment>
);

const CustomButton = ({ children, ...props }) => {
  return <button { ...props }>{ children }</button>;
};

export const CustomComponents = () => {
  const name = text('name', 'test');
  const renderSteps = boolean('Use stepper', true);

  return (
    <Form
      name={ name }
      renderSteps={ renderSteps }
      Input={ CustomInput }
      Button={ CustomButton }
      Upload={ CustomInput }
    />
  );
};

CustomComponents.story = {
  name: 'Custom components',
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    info: {
      propTablesExclude: []
    },
    notes: README
  }
};

export default {
  title: 'Organisms/Form'
};