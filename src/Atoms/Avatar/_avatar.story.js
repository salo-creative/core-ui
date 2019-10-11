import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { RenderWithProps } from '@jamesbliss/storybook-state';

// Load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Avatar, colours } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Avatar', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['avatar'] });

stories.add(
  'Basic',
  (() => {
    // KNOBS
    const image = text('Image URL', 'https://traveler.marriott.com/wp-content/uploads/2017/12/Costa-Rica_surfers-GettyImages-578363125.jpg');
    const size = number('Size', 100);
    const firstName = text('First name', 'Salo');
    const lastName = text('Last name', 'Creative');
    const colour = text('Fallback Colour', colours.blue);

    return (
      <Avatar
        size={ size }
        firstName={ firstName }
        lastName={ lastName }
        image={ image }
        colour={ colour }
        onClick={ () => alert('Avatar clicked') }
      />
    );
  }),
  {
    info: { propTablesExclude: [RenderWithProps] },
    notes: README
  }
);