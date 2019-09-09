import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Form } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Organisms | Form', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));

stories.add(
  'Basic',
  (() => {
    const name = text('name', 'test');
    const renderSteps = boolean('Use stepper', true);
    
    return (
      <Form
        name={ name }
        renderSteps={ renderSteps }
      />
    );
  }), { info: { propTablesExclude: [] }, notes: README }
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
      { ...props } // eslint-disable-line react/jsx-props-no-spreading
      onBlur={ (e) => onBlur({ e, value: e.target.value }) }
      onChange={ (e) => onChange({ e, value: e.target.value }) }
      onKeyUp={ _ => _ }
    />
    <span>{ error ? errorMessage : '' }</span>
  </React.Fragment>
);

const CustomButton = ({
  children,
  ...props
}) => {
  return <button { ...props }>{ children }</button>; // eslint-disable-line react/jsx-props-no-spreading
};

stories.add(
  'Custom components',
  (() => {
    const name = text('name', 'test');
    const renderSteps = boolean('Use stepper', true);

    return (
      <Form
        name={ name }
        renderSteps={ renderSteps }
        Input={ CustomInput }
        Button={ CustomButton }
      />
    );
  }), { info: { propTablesExclude: [] }, notes: README }
);