import React from 'react';
import {
  withKnobs, boolean, text, number, select
} from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Component.
import { TextArea } from '../../index';

// README
import README from './README.md';

export const Basic = () => {
  // Initialize store.
  const store = new Store({
    value: 'Some text would sure look nice here.'
  });

  // Knobs.
  const label = text('Label', 'TextArea Label');
  const error = boolean('Show error state', false);
  const required = boolean('Required field', false);
  const disabled = boolean('Show disabled state', false);
  const rows = number('Rows', 3);
  const helperText = text('Helper text', 'Helper text');
  const size = select('size', ['L', 'M'], 'M');
  return (
    <RenderWithProps store={ store }>
      <TextArea
        name='story'
        disabled={ disabled }
        error={ error }
        label={ label }
        required={ required }
        helperText={ helperText }
        value={ store.value }
        onChange={ ({ value }) => store.set({
          value
        }) }
        rows={ rows }
        size={ size }
      />
    </RenderWithProps>
  );
};

Basic.story = {
  parameters: {
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export const Counter = () => {
  // Initialize store.
  const store = new Store({
    value: 'Some text would sure look nice here.'
  });

  // Knobs.
  const label = text('Label', 'TextArea Label');
  const error = boolean('Show error state', false);
  const required = boolean('Required field', false);
  const disabled = boolean('Show disabled state', false);
  const rows = number('Rows', 3);
  const maxSize = number('Max characters', 200);
  const helperText = text('Helper text', 'Helper text');
  const size = select('size', ['L', 'M'], 'M');
  return (
    <RenderWithProps store={ store }>
      <TextArea
        countTo={ maxSize }
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        label={ label }
        max={ maxSize }
        name='story'
        onChange={ ({ value }) => store.set({
          value
        }) }
        required={ required }
        rows={ rows }
        size={ size }
        value={ store.value }
      />
    </RenderWithProps>
  );
};

Counter.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['textarea'],
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export default {
  title: 'Forms/TextArea'
};