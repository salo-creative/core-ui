import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import {
  Card, colours, FlyOut, FlyOutButton, FlyOutLink
} from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const background = text('background', colours.grey);
  const borderRadius = text('borderRadius', '0.4rem');
  const margin = text('margin', '0');
  const padding = text('padding', '2rem');
  return (
    <Card background={ background } borderRadius={ borderRadius } margin={ margin } padding={ padding }>
      something
    </Card>
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
    jest: ['card'],
    notes: README
  }
};

export const Action = () => {
  const background = text('background', colours.grey);
  const borderRadius = text('borderRadius', '0.4rem');
  const margin = text('margin', '0');
  const padding = text('padding', '2rem');
  const cardActionsTop = boolean('cardActionsTop', true);
  return (
    <Card background={ background } borderRadius={ borderRadius } margin={ margin } padding={ padding }>
      something
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      more
      <br />
      <FlyOut context='card' cardActionsTop={ cardActionsTop }>
        <FlyOutButton title='Title' onClick={ () => alert('Button Clicked') } icon='sync' />
        <FlyOutLink title='Title' link='#' icon='dashboard' />
      </FlyOut>
    </Card>
  );
};

Action.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['card'],
    notes: README
  }
};

export default {
  title: 'Molecules/Card'
};