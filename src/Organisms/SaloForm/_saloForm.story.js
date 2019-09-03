import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { SaloForm } from '../../index';

// README //
import README from './README.md';

import ApolloClient from '../../Apollo/client';
import useFormData from '../../Forms/useFormData/useFormData.js';

// Start of story logic
const stories = storiesOf('Organisms | SaloForm', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));

const client = ApolloClient({
  uri: 'http://localhost:7000/graphql',
  tokens: { clientKey: 'mhbt06bY+s/9vgI6z3q8OKJTgHCUHX710tjENG+3dfY=' }
});

const Form = ({ name }) => {
  const data = useFormData({ name });
  console.log('exposed data API', data);
  return <pre>{ JSON.stringify(data, null, 2) }</pre>;
};

stories.add(
  'Data',
  (() => {
    const name = text('name', 'test');

    return (
      <ApolloProvider client={ client }>
        <Form
          name={ name }
        />
      </ApolloProvider>
    );
  }), { info: { propTablesExclude: [ApolloProvider, Form] }, notes: README }
);

stories.add(
  'UI',
  (() => {
    const name = text('name', 'test');
    
    return (
      <ApolloProvider client={ client }>
        <SaloForm
          name={ name }
        />
      </ApolloProvider>
    );
  }), { notes: README }
);