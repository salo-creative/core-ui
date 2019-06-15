import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Breadcrumb } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Breadcrumb', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['breadcrumb'] });

stories.add(
  'Basic',
  (() => {
    const margin = text('Margin', '0 0 2rem');
    const trail = object('Trail', [
      { label: 'Home', link: 'https://www.google.co.uk' },
      { label: 'Previous page', link: '/previous-page' },
      { label: 'Current page' }
    ]);
    return (
      <Breadcrumb
        margin={ margin }
        trail={ trail }
      />
    );
  }), { notes: README }
);