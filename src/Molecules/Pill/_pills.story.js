import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import Pill from './pill';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Pill', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['pills'] });

stories.add(
  'Single Pill',
  (() => {
    // STORE
    const store = new Store({});
    // KNOBS
    const value = text('Value', '1');
    const label = text('Label', 'Single Pill');
    const color = select('Color', ['blue', 'red', 'orange', 'navy', 'green', 'darkGrey', 'yellow', 'white', 'black'], 'black');
    const background = select('Background', ['blue', 'red', 'orange', 'navy', 'green', 'darkGrey', 'yellow', 'white', 'grey'], 'grey');
    const loading = boolean('Show loading state', false);
    return (
      <RenderWithProps store={ store }>
        <Pill
          value={ value }
          label={ label }
          color={ color }
          background={ background }
          onRemove={ (id) => console.log(id) }
          loading={ loading }
        />
      </RenderWithProps>
    );
  }),
  { info: { propTablesExclude: [RenderWithProps] }, notes: README }
);