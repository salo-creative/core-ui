import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, boolean, text, select
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import moment from 'moment';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Component.
import { DatePicker } from '../../index';

// Readme.
import README from './README.md';

// Story logic.
const stories = storiesOf('Forms | DatePicker', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['datePicker']
});

stories.add(
  'Basic',
  (() => {
    // Store.
    const store = new Store({
      date: ''
    });
    // Knobs.
    const label = text('Label', 'Date picker label');
    const asSelect = boolean('Day/Month/Year Dropdown', false);
    const helperText = text('Helper Text', 'Helper Text');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state');
    const dateRangeMin = text('Date Minimum', moment().format('YYYY-MM-DD'));
    const dateRangeMax = text('Date Maximum');
    const size = select('size', ['L', 'M'], 'M');
    const displayFormat = text('Display format', 'DD/MM/YYYY');
    const ioFormat = text('I/O format', 'DD/MM/YYYY');
    return (
      <State store={ store }>
        { state => (
          <DatePicker
            dateRangeMin={ dateRangeMin }
            dateRangeMax={ dateRangeMax }
            disabled={ disabled }
            displayFormat={ displayFormat }
            error={ error }
            asSelect={ asSelect }
            helperText={ helperText }
            ioFormat={ ioFormat }
            label={ label }
            name='story'
            onChange={ date => store.set({
              date
            }) }
            required={ required }
            size={ size }
            value={ state.date }
          />
        ) }
      </State>
    );
  }),
  {
    info: {
      propTables: [DatePicker], propTablesExclude: [State]
    },
    notes: README
  }
);