import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENTS //
import { FlyOut, FlyOutLink, FlyOutButton } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  return (
    <FlyOut context='float'>
      <FlyOutButton title='Title' onClick={ () => alert('Button Clicked') } icon='sync' />
      <FlyOutLink title='Title' link='#' icon='dashboard' />
    </FlyOut>
  );
};

Basic.story = {
  decorators: [
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['flyout'],
    notes: README
  }
};

export default {
  title: 'Molecules/FlyOut'
};