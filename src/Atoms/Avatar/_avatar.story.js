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
    const image = text('Image URL', 'http://i.stack.imgur.com/Dj7eP.jpg');
    const size = number('Size', 100);
    const fallbackText = text('Fallback Text', 'Peter');
    const colour = text('Fallback Colour', colours.blue);

    return (
      <Avatar
        size={ size }
        text={ fallbackText }
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