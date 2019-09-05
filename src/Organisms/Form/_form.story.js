import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Form } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Organisms | Form', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));

stories.add(
  'Basic',
  (() => {
    const name = text('name', 'test');
    
    return (
      <Form
        name={ name }
      />
    );
  }), { info: { propTablesExclude: [] }, notes: README }
);