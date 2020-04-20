import React from 'react';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, number } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENTS //
import { Pagination } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  // STORE
  const store = new Store({
    page: 7
  });
  // KNOBS
  const perPage = number('Results per page', 24);
  const pagesToShow = number('Paginated pages to display', 10);
  const total = number('Total items', 1000);
  return (
    <RenderWithProps store={ store }>
      <Pagination
        changePage={ page => store.set({
          page
        }) }
        perPage={ perPage }
        page={ store.page }
        pagesToShow={ pagesToShow }
        total={ total }
      />
    </RenderWithProps>
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
    jest: ['pagination'],
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Pagination'
};