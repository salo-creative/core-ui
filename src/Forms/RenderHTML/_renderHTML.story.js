import React from 'react';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { RenderHTML } from '../../index';

// README //
import README from './README.md';

// Story logic
export const Basic = () => {
  return <RenderHTML content='<h1>Hello World</h1>' />;
};

Basic.story = {
  decorators: [
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['readonly'],
    info: {
      propTablesExclude: []
    },
    notes: README
  }
};

export default {
  title: 'Forms/RenderHTML'
};