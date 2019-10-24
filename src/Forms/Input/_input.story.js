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
import { Input } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Forms | Input', module);
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
      value: 'Some text'
    });
    // KNOBS
    const label = text('Label', 'Input label');
    const helperText = text('Helper text', 'Helper text');
    const icon = text('Icon', 'pencil');
    const padding = text('Padding', '0 2rem 0 5rem');
    const border = text('Border', '1px solid');
    const borderRadius = text('Border radius', '0.4rem');
    const fontSize = text('Font size', '1.4rem');
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
          fontSize={ fontSize }
          label={ label }
          required={ required }
          helperText={ helperText }
          showStrength={ showStrength }
          size={ size }
          type={ type }
          icon={ icon }
          padding={ padding }
          border={ border }
          borderRadius={ borderRadius }
          value={ store.value }
          onChange={ ({ value }) => store.set({
            value
          }) }
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


stories.add(
  'Icon advanced usage',
  (() => {
    // STORE
    const store = new Store({
      value: 'Some text'
    });
    // KNOBS
    const label = text('Label', 'Input label');
    const helperText = text('Helper text', 'Helper text');
    const icon = object('Icon', {
      fill: 'hotpink',
      icon: 'pencil',
      offset: '0',
      position: 'right'
    });
    const padding = text('Padding', '0 5rem 0 2rem');
    const border = text('Border', '1px solid');
    const borderRadius = text('Border radius', '0.4rem');
    const fontSize = text('Font size', '1.4rem');
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
          fontSize={ fontSize }
          label={ label }
          required={ required }
          helperText={ helperText }
          showStrength={ showStrength }
          size={ size }
          type={ type }
          icon={ icon }
          padding={ padding }
          border={ border }
          borderRadius={ borderRadius }
          value={ store.value }
          onChange={ ({ value }) => store.set({
            value
          }) }
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