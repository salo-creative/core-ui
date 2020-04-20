import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import {
  withKnobs, text, number, color
} from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Divider, colours } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const height = number('Height', 1);
  const colour = color('Colour', colours.grey);
  const margin = text('Margin', '2rem 0');
  return <Divider height={ height } color={ colour } margin={ margin } />;
};

Basic.story = {
  decorators: [withKnobs, withTests({
    results
  })],
  parameters: {
    notes: README,
    jest: ['divider']
  }
};

export default {
  title: 'Atoms/Divider'
};