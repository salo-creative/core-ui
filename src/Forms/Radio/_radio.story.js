import React from 'react';
import {
  withKnobs, boolean, text, select
} from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Components.
import { Radio } from '../../index';

// README
import README from './README.md';

// Story logic.
export const Basic = () => {
  const options = [
    {
      value: 'field_1',
      label: 'Field 1'
    },
    {
      value: 'field_2',
      label: 'Field 2'
    },
    {
      value: 'field_3',
      label: 'Field 3'
    },
    {
      value: 'other',
      label: 'Other',
      input: true
    }
  ];
  // Store.
  const store = new Store({
    value: ''
  });
  // Knobs.
  const label = text('Label', 'Radio group label');
  const helperText = text('Helper text', 'Helper text');
  const error = boolean('Show error state', false);
  const required = boolean('Required field', false);
  const disabled = boolean('Show disabled state', false);
  const size = select('size', ['L', 'M'], 'M');
  return (
    <RenderWithProps store={ store }>
      <Radio
        disabled={ disabled }
        error={ error }
        helperText={ helperText }
        label={ label }
        name='story'
        options={ options }
        onChange={ value => {
          store.set({
            value
          });
          console.log('Radio value:', value);
        } }
        required={ required }
        size={ size }
        value={ store.value }
      />
    </RenderWithProps>
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
    jest: ['radio'],
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export default {
  title: 'Forms/Radio'
};