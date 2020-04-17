import React from 'react';
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
export const Basic = () => {
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
  const timePicker = boolean('Show time picker', true);
  const dateRangeMin = text('Date Minimum', moment().format('YYYY-MM-DD'));
  const dateRangeMax = text('Date Maximum');
  const size = select('size', ['L', 'M'], 'M');
  const displayFormat = text('Display format', 'DD/MM/YYYY HH:mm');
  const ioFormat = text('I/O format', 'YYYY-MM-DDTHH:mm:ss.SSSZ');
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
          timePicker={ timePicker }
          value={ state.date }
        />
      ) }
    </State>
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
    jest: ['datePicker'],
    info: {
      propTables: [DatePicker],
      propTablesExclude: [State]
    },
    notes: README
  }
};

export default {
  title: 'Forms/DatePicker'
};