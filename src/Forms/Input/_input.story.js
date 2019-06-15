import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Input } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Forms | Input', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['input'] });

stories.add(
  'Basic',
  (() => {
    // STORE
    const store = new Store({ value: 'Some text' });
    // KNOBS
    const label = text('Label', 'Input label');
    const helperText = text('Helper text', 'Helper text');
    const icon = text('Icon', 'pencil');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const showStrength = boolean('Show password strength indicator', false);
    const size = select('size', ['L', 'M'], 'M');
    const type = select('type', ['text', 'email', 'tel', 'number', 'password'], 'text');
    return (
      <RenderWithProps store={ store }>
        <Input
          name='story'
          disabled={ disabled }
          error={ error }
          label={ label }
          required={ required }
          helperText={ helperText }
          showStrength={ showStrength }
          size={ size }
          type={ type }
          icon={ icon }
          value={ store.value }
          onChange={ ({ value }) => store.set({ value }) }
        />
      </RenderWithProps>
    );
  }),
  {
    info: { propTablesExclude: [RenderWithProps] },
    notes: README
  }
);