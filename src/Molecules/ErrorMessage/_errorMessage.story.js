import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENTS //
import { ErrorMessage } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  // KNOBS
  const title = text('Title', 'Error title');
  return <ErrorMessage error={ {} } title={ title } retryAction={ () => alert('Retry this') } />;
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    notes: README,
    jest: ['errormessage']
  }
};

export default {
  title: 'Molecules/ErrorMessage'
};