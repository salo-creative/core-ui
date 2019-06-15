import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Selector } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Selector', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['selector'] });

stories.add(
  'Basic',
  (() => {
    const size = select('size', ['L', 'M'], 'M');
    // STORE
    const store = new Store({ value: '' });
    return (
      <RenderWithProps store={ store }>
        <Selector
          data={ [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' }
          ] }
          value={ store.value }
          onChange={ (value) => store.set({ value }) }
          size={ size }
        />
      </RenderWithProps>
    );
  }),
  { info: { propTablesExclude: [] }, notes: README }
);