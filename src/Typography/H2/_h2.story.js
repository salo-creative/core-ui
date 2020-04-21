import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import {
  withKnobs, text, select, color
} from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { H2 } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const align = select(
    'Align',
    {
      Left: 'left',
      Right: 'right',
      Center: 'center'
    },
    'center'
  );
  const fontSize = text('Font size', '');
  const colour = color('Colour', '#262729');
  const margin = text('Margin', '30px 0 10px');
  return (
    <H2 color={ colour } fontSize={ fontSize } align={ align } margin={ margin }>
      H2 Headline <br /> With a second line
    </H2>
  );
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['h2'],
    notes: README
  }
};

export default {
  title: 'Atoms/Typography/H2'
};