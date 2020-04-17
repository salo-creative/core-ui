import React from 'react';
import {
  withKnobs, boolean, text, select
} from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Address, Input } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  // STORE
  const store = new Store({
    value: {}
  });
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
        border={ border }
        borderRadius={ borderRadius }
        disabled={ disabled }
        error={ error }
        fontSize={ fontSize }
        Input={ Input }
        name='story'
        onChange={ address => console.log(address) }
        padding={ padding }
        required={ required }
        size={ size }
        value={ store.value }
      />
    </RenderWithProps>
  );
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README,
    jest: ['address']
  }
};

export default {
  title: 'Forms/Address'
};