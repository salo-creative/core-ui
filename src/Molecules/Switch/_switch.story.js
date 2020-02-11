import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, select, text, boolean
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import styled from 'styled-components';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Switch } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Switch', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['switch']
});

const CustomSwitch = styled(Switch)`
  border: 1px dashed hotpink;
  border-radius: 25px;
  padding: 0 10px;

  .salo-switch__container {
    transition: background-color ${ ({ transitionTime }) => transitionTime } ease-in;
  }

  .salo-switch__container--active {
    background: rebeccapurple;
  }

  .salo-switch__handle {
    background: slateblue;
  }

  .salo-switch__label {
    color: #444;
  }
`;

stories.add(
  'Basic',
  (() => {
    const disabled = boolean('disabled', false);
    const label = text('label', 'Yes');
    const labelOff = text('labelOff', 'No');
    const labelPosition = select('label position', ['left', 'right'], 'right');
    const loading = boolean('loading', false);
    const showBoth = boolean('showBoth', false);
    const size = select('size', ['L', 'M'], 'M');
    // STORE
    const store = new Store({
      value: false
    });
    return (
      <State store={ store }>
        { state => (
          <Switch
            disabled={ disabled }
            label={ label }
            labelOff={ labelOff }
            labelPosition={ labelPosition }
            loading={ loading }
            showBoth={ showBoth }
            onChange={ (value) => store.set({
              value
            }) }
            size={ size }
            value={ state.value }
          />
        ) }
      </State>
    );
  }),
  {
    info: {
      propTables: [Switch],
      propTablesExclude: [State]
    },
    notes: README
  }
);

stories.add(
  'Customised',
  (() => {
    const disabled = boolean('disabled', false);
    const label = text('label', 'Stuff');
    const labelOff = text('labelOff', '');
    const labelPosition = select('label position', ['left', 'right'], 'right');
    const loading = boolean('loading', false);
    const size = select('size', ['L', 'M'], 'M');
    // STORE
    const store = new Store({
      value: false
    });
    return (
      <State store={ store }>
        { state => (
          <CustomSwitch
            disabled={ disabled }
            label={ label }
            labelOff={ labelOff }
            labelPosition={ labelPosition }
            loading={ loading }
            onChange={ (value) => store.set({
              value
            }) }
            size={ size }
            transitionTime='1s'
            value={ state.value }
          />
        ) }
      </State>
    );
  }),
  {
    info: {
      propTables: [Switch],
      propTablesExclude: [State]
    },
    notes: README
  }
);