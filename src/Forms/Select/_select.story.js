import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured component.
import { Select } from '../../index';

// README
import README from './README.md';

// Story logic.
const stories = storiesOf('Forms | Select', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['select'] });

stories.add(
  'Basic',
  (() => {
    // Store.
    const store = new Store({ value: 'Option 1' });
    // Knobs.
    const label = text('Label', 'Select Label');
    const helperText = text('Helper text', 'Helper text');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const iconAfter = boolean('Icon after', true);
    const size = select('size', ['L', 'M'], 'M');
    return (
      <RenderWithProps store={ store }>
        <Select
          name='story'
          disabled={ disabled }
          error={ error }
          label={ label }
          required={ required }
          helperText={ helperText }
          iconAfter={ iconAfter }
          size={ size }
          value={ store.value }
          onChange={ ({ value }) => store.set({ value }) }
        >
          <option value='Option 1'>Option 1</option>
          <option value='Option 2'>Option 2</option>
          <option value='Option 3'>Option 3</option>
        </Select>
      </RenderWithProps>
    );
  }),
  {
    info: { propTablesExclude: [RenderWithProps] },
    notes: README
  }
);