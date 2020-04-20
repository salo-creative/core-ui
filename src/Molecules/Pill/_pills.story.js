import React from 'react';
import {
  withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import Pill from './pill';

// README //
import README from './README.md';

// Start of story logic
export const SinglePill = () => {
  // STORE
  const store = new Store({});
  // KNOBS
  const value = text('Value', '1');
  const label = text('Label', 'Single Pill');
  const color = select(
    'Color',
    ['blue', 'red', 'orange', 'navy', 'green', 'darkGrey', 'yellow', 'white', 'black'],
    'black'
  );
  const background = select(
    'Background',
    ['blue', 'red', 'orange', 'navy', 'green', 'darkGrey', 'yellow', 'white', 'grey'],
    'grey'
  );
  const loading = boolean('Show loading state', false);
  return (
    <RenderWithProps store={ store }>
      <Pill
        value={ value }
        label={ label }
        color={ color }
        background={ background }
        onRemove={ id => console.log(id) }
        loading={ loading }
      />
    </RenderWithProps>
  );
};

SinglePill.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['pills'],
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Pill'
};