import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Address } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Forms | Address', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['address'] });

stories.add(
  'Basic',
  (() => {
    // STORE
    const store = new Store({ value: {} });
    // KNOBS
    const padding = text('Padding', '0 1rem');
    const border = text('Border', '1px solid');
    const borderRadius = text('Border radius', '0.4rem');
    const fontSize = text('Font size', '1.4rem');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const size = select('size', ['L', 'M'], 'M');
    return (
      <RenderWithProps store={ store }>
        <Address
          name='story'
          disabled={ disabled }
          error={ error }
          fontSize={ fontSize }
          required={ required }
          size={ size }
          padding={ padding }
          border={ border }
          borderRadius={ borderRadius }
          value={ store.value }
          onChange={ (address) => console.log(address) }
        />
      </RenderWithProps>
    );
  }),
  {
    info: { propTablesExclude: [RenderWithProps] },
    notes: README
  }
);