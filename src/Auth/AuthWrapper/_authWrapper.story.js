import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { AuthWrapper } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Auth | AuthWrapper', module);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['authwrapper'] });

stories.add(
  'Basic',
  (() => {
    return (
      <React.Fragment>
        <AuthWrapper>
          <h1>LOGGED IN</h1>
          <p>You are currently logged in. The AuthWrapper will unmount this component when you logout</p>
          <p>You can logout by going to the Auth -> Login component in this storybook</p>
        </AuthWrapper>
        <AuthWrapper authenticated={ false }>
          <h1>LOGGED OUT</h1>
          <p>You are currently logged out. The AuthWrapper will unmount this component when you login</p>
          <p>You can login by going to the Auth -> Login component in this storybook</p>
        </AuthWrapper>
      </React.Fragment>
    );
  }),
  {
    info: { propTablesExclude: [React.Fragment] },
    notes: README
  }
);