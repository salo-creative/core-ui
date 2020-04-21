import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { ReadOnly } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  // KNOBS
  const label = text('label', 'Field label');
  const name = text('name', 'field_name');
  const value = text('value', 'The field value goes in here.');
  return <ReadOnly label={ label } name={ name } value={ value } />;
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['readonly'],
    info: {
      propTablesExclude: []
    },
    notes: README
  }
};

export default {
  title: 'Forms/ReadOnly'
};