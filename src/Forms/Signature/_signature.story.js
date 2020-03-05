import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Component.
import { Signature } from '../../index';

// README
import README from './README.md';

// Story logic.
const stories = storiesOf('Forms | Signature', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['signature']
});

stories.add(
  'Basic',
  (() => {
    // Knobs.
    const label = text('Label', 'Signature Label');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const helperText = text('Helper text', 'Helper text');
    return (
      <Signature
        name='story'
        error={ error }
        label={ label }
        required={ required }
        helperText={ helperText }
        onChange={ ({ value }) => {
          console.log('Signature image: ', value);
        } }
        canvasProps={ {
          width: 600,
          height: 300
        } }
      />
    );
  }),
  {
    notes: README
  }
);