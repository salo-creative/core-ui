import React from 'react';
import {
  withKnobs, boolean, text, number
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Range } from '../../index';

// README
import README from './README.md';

export const Basic = () => {
  // STORE
  const store = new Store({
    value: 50
  });
  // KNOBS
  const label = text('Label', 'Range label');
  const error = boolean('Show error state', false);
  const errorMessage = text('Error Text', 'Something went wrong!');
  const helperText = text('Helper text', 'Helper text');
  const step = number('Step', 1);
  const disabled = boolean('Show disabled state', false);

  return (
    <State store={ store }>
      { state => (
        <Range
          disabled={ disabled }
          error={ error }
          errorMessage={ errorMessage }
          helperText={ helperText }
          label={ label }
          name='story'
          min={ 0 }
          max={ 100 }
          value={ state.value }
          onChange={ ({ value }) => {
            store.set({
              value
            });
          } }
          step={ step }
        />
      ) }
    </State>
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
    jest: ['rangeslider'],
    info: {
      propTablesExclude: [State]
    },
    notes: README
  }
};

export default {
  title: 'Forms/Range'
};