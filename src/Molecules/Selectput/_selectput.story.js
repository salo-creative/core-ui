import React from 'react';
import { storiesOf } from '@storybook/react';
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
const stories = storiesOf('Molecules | Selectput', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['selector'] });

stories.add(
  'Basic',
  (() => {
    // STORE
    const store = new Store({ value: '' });
    return (
      <RenderWithProps store={ store }>
        <Selectput
          options={ [
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'phone', label: 'Phone' },
            { value: 'skype', label: 'Skype' }
          ] }
          value={ store.value }
          onChange={ (value) => store.set({ value }) }
          onReset={ () => store.set({ value: '' }) }
          onSubmit={ (value) => store.set({ value }) }
        />
      </RenderWithProps>
    );
  }),
  { info: { propTablesExclude: [] }, notes: README }
);


stories.add(
  'Edit',
  (() => {
    // STORE
    const store = new Store({ value: '' });
    return (
      <RenderWithProps store={ store }>
        <Selectput
          options={ [
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'phone', label: 'Phone' },
            { value: 'skype', label: 'Skype' }
          ] }
          value={ store.value }
          initialMode='edit'
          initialSelected='phone'
          onChange={ (value) => store.set({ value }) }
          onReset={ () => store.set({ value: '' }) }
          onSubmit={ (value) => store.set({ value }) }
        />
      </RenderWithProps>
    );
  }),
  { info: { propTablesExclude: [] }, notes: README }
);