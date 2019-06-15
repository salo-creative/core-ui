import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Numbers } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Forms | Numbers', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['input'] });

stories.add(
  'Basic',
  (() => {
    // STORE
    const store = new Store({
      value: [{
        phone_type: 'home',
        phone_number: '012411 124124'
      }]
    });
    // KNOBS
    const label = text('Label', 'Input label');
    const helperText = text('Helper text', 'Helper text');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const size = select('size', ['L', 'M'], 'M');
    return (
      <State store={ store }>
        { state => (
          <Numbers
            name='story'
            disabled={ disabled }
            error={ error }
            label={ label }
            required={ required }
            helperText={ helperText }
            size={ size }
            value={ state.value }
            onChange={ ({ value }) => store.set({ value }) }
          />
        ) }
      </State>
    );
  }),
  {
    info: { propTables: [Numbers], propTablesExclude: [State] },
    notes: README
  }
);