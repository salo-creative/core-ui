import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, boolean, text, select, object
} from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { MultiSelect } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | MultiSelect', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['input']
});

stories.add(
  'Basic',
  (() => {
    // STORE
    const store = new Store({
      value: ['option_one', 'option_three']
    });
    // KNOBS
    const label = text('Label', 'Input label');
    const helperText = text('Helper text', 'Helper text');
    const icon = text('icon', 'users');
    const padding = text('Padding', '0 1rem');
    const border = text('Border', '1px solid');
    const borderRadius = text('Border radius', '0.4rem');
    const fontSize = text('Font size', '1.4rem');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const requireConfirm = boolean('Require confirm', true);
    const size = select('size', ['L', 'M'], 'M');
    const options = object('options', [{
      label: 'Option 1 is really quite long and we need to handle it you',
      value: 'option_one'
    }, {
      label: 'Option 2',
      value: 'option_two'
    }, {
      label: 'Option 3 is als a little on the long side',
      value: 'option_three'
    }, {
      label: 'Option 4',
      value: 'option_four'
    }, {
      label: 'Option 5',
      value: 'option_five'
    }, {
      label: 'Option 6',
      value: 'option_six'
    }]);
    return (
      <RenderWithProps store={ store }>
        <MultiSelect
          name='story'
          disabled={ disabled }
          error={ error }
          fontSize={ fontSize }
          label={ label }
          required={ required }
          helperText={ helperText }
          size={ size }
          icon={ icon }
          padding={ padding }
          requireConfirm={ requireConfirm }
          border={ border }
          borderRadius={ borderRadius }
          value={ store.value }
          onChange={ ({ value }) => store.set({
            value
          }) }
          options={ options }
        />
      </RenderWithProps>
    );
  }),
  {
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
);