import React from 'react';
import {
  withKnobs, boolean, select, text
} from '@storybook/addon-knobs';
import { ToggleVisibility, Store, RenderWithProps } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Drop, Button } from '../../index';

// README //
import README from './README.md';

// Start of story logic
// STATE
const storeBasic = new Store({
  _STATE_VISIBILITY_TOGGLE_: false,
  element: null,
  value: ''
});

export const Basic = () => {
  // // KNOBS
  // const skin = select('Skin', {
  //   'Light': 'light',
  //   'Dark': 'dark'
  // }, 'light');
  // const label = text('Label', 'Input label');
  // const helperText = text('Helper text', 'Helper text');
  // const icon = text('Icon', 'pencil');
  // const outlined = boolean('Outlined', false);
  // const error = boolean('Show error state', false);
  // const required = boolean('Required field', false);
  // const disabled = boolean('Show disabled state', false);
  return (
    <div>
      <Button
        onClick={ e => {
          storeBasic.set({
            element: e.target,
            _STATE_VISIBILITY_TOGGLE_: !storeBasic.get('_STATE_VISIBILITY_TOGGLE_')
          });
        } }
      >
        Open drop
      </Button>
      <ToggleVisibility store={ storeBasic }>
        <RenderWithProps store={ storeBasic }>
          <Drop
            open={ true }
            onClose={ () => storeBasic.set({
              _STATE_VISIBILITY_TOGGLE_: false
            }) }
          >
            <Button fullWidth radius={ false } skin='text'>
              My account
            </Button>
            <Button fullWidth radius={ false } skin='secondary'>
              Login
            </Button>
          </Drop>
        </RenderWithProps>
      </ToggleVisibility>
    </div>
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
    jest: ['drop'],
    info: {
      propTablesExclude: [RenderWithProps, Button]
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Drop'
};