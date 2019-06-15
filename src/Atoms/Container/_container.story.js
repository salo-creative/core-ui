import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Container } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Grid/Container', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['container'] });

stories.add(
  'Basic',
  (() => {
    const width = text('Width', '1280px');
    const padding = text('Padding', '0 0 0 0');
    return (
      <Container
        width={ width }
        padding={ padding }
        style={ { background: '#eaeaea' } }
      >
        A lovely Container
      </Container>
    );
  }), { notes: README }
);