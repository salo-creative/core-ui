import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENTS //
import { ErrorMessage } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | ErrorMessage', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['errormessage'] });

stories.add(
  'Basic',
  (() => {
    // KNOBS
    const title = text('Title', 'Error title');
    return (
      <ErrorMessage
        error={ {} }
        title={ title }
        retryAction={ () => alert('Retry this') }
      />
    );
  }), { notes: README }
);