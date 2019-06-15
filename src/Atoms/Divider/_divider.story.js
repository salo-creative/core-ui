import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, number, color } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Divider, colours } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Divider', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['divider'] });

stories.add(
  'Basic',
  (() => {
    const height = number('Height', 1);
    const colour = color('Colour', colours.grey);
    const margin = text('Margin', '2rem 0');
    return (
      <Divider
        height={ height }
        color={ colour }
        margin={ margin }
      />
    );
  }), { notes: README }
);