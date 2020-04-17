import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Ol } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const fontSize = text('Font size', '');
  const lineHeight = text('Line height', '');
  const colour = color('Colour', '#262729');
  const margin = text('Margin', '0 0 20px');
  return (
    <Ol color={ colour } fontSize={ fontSize } lineHeight={ lineHeight } margin={ margin }>
      <li>My first item</li>
      <li>
        <p>My second item</p>
      </li>
      <li>My third item</li>
      <li>
        My fourth item. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
        Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
      </li>
    </Ol>
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
    jest: ['ol'],
    notes: README
  }
};


export default {
  title: 'Atoms/Typography/OL'
};