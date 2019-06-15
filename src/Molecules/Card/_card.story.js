import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Card, colours } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | Card', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['card'] });

stories.add(
  'Basic',
  (() => {
    const background = text('background', colours.grey);
    const borderRadius = text('borderRadius', '0.4rem');
    const margin = text('margin', '0');
    const padding = text('padding', '2rem');
    return (
      <Card
        background={ background }
        borderRadius={ borderRadius }
        margin={ margin }
        padding={ padding }
      >
        something
      </Card>
    );
  }), { notes: README }
);