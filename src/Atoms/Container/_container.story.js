import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Container } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const width = text('Width', '1280px');
  const padding = text('Padding', '0 0 0 0');
  return (
    <Container
      width={ width }
      padding={ padding }
      style={ {
        background: '#eaeaea'
      } }
    >
      A lovely Container
    </Container>
  );
};

Basic.story = {
  decorators: [withKnobs, withTests({
    results
  })],
  parameters: {
    notes: README,
    jest: ['container']
  }
};

export default {
  title: 'Atoms/Grid/Container'
};