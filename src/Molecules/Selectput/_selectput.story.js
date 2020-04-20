import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Selectput } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  // STORE
  const store = new Store({
    value: ''
  });
  return (
    <RenderWithProps store={ store }>
      <Selectput
        options={ [
          {
            value: 'linkedin', label: 'LinkedIn'
          },
          {
            value: 'phone', label: 'Phone'
          },
          {
            value: 'skype', label: 'Skype'
          }
        ] }
        value={ store.value }
        onChange={ value => store.set({
          value
        }) }
        onReset={ () => store.set({
          value: ''
        }) }
        onSubmit={ value => store.set({
          value
        }) }
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
    jest: ['selectput'],
    info: {
      propTablesExclude: []
    },
    notes: README
  }
};

export const Edit = () => {
  // STORE
  const store = new Store({
    value: ''
  });
  return (
    <RenderWithProps store={ store }>
      <Selectput
        options={ [
          {
            value: 'linkedin', label: 'LinkedIn'
          },
          {
            value: 'phone', label: 'Phone'
          },
          {
            value: 'skype', label: 'Skype'
          }
        ] }
        value={ store.value }
        initialMode='edit'
        initialSelected='phone'
        onChange={ value => store.set({
          value
        }) }
        onReset={ () => store.set({
          value: ''
        }) }
        onSubmit={ value => store.set({
          value
        }) }
      />
    </RenderWithProps>
  );
};

Edit.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['selectput'],
    info: {
      propTablesExclude: []
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Selectput'
};