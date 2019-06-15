import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENTS //
import { FlyOut, FlyOutLink, FlyOutButton } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Molecules | FlyOut', module);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['flyout'] });

stories.add(
  'Basic',
  (() => {
    return (
      <FlyOut context='float'>
        <FlyOutButton title='Title' onClick={ () => alert('Button Clicked') } icon='sync' />
        <FlyOutLink title='Title' link='#' icon='dashboard' />
      </FlyOut>
    );
  }), { notes: README }
);