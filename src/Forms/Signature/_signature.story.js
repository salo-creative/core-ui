import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

// Featured Component.
import { Signature } from '../../index';

// README
import README from './README.md';

// Story logic.
export const Basic = () => {
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
};

Basic.story = {
  title: 'Forms/Signature',
  decorators: [withKnobs],
  parameters: {
    notes: README
  }
};

export default {
  title: 'Forms/Signature'
};