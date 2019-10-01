import React from 'react';
import { storiesOf } from '@storybook/react';
import { get } from 'lodash';
import { ToggleVisibility, Store, RenderWithProps } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Table, FlyOut, FlyOutLink, FlyOutButton } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Organisms | Table', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['table'] });

stories.add(
  'Basic',
  (() => {
    const margin = text('Width', '100%');
    const width = text('Margin', '0 0 2rem');
    const dataEmptyText = text('Data empty text', 'There are no results to display');
    const borders = boolean('Borders', true);
    const error = boolean('Error', false);
    const errorMessage = text('Error message', 'Something went wrong getting your data!');
    const showHeader = boolean('Show header', true);
    const loading = boolean('Loading', false);
    const columns = object('Columns', [
      { label: 'Column 1', dataKey: 'column_1', minWidth: '200px' },
      { label: 'Column 2', dataKey: 'column_2', minWidth: '200px' },
      { label: 'Column 3', dataKey: 'column_3', minWidth: '200px' }
    ]);
    const data = object('Data', [
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' }
    ]);
    return (
      <Table
        borders={ borders }
        columns={ columns }
        data={ data }
        dataEmptyText={ dataEmptyText }
        error={ error }
        errorMessage={ errorMessage }
        loading={ loading }
        margin={ margin }
        retryAction={ () => alert('retry') }
        showHeader={ showHeader }
        width={ width }
      />
    );
  }), { notes: README }
);

stories.add(
  'Pagination',
  (() => {
    const margin = text('Width', '100%');
    const width = text('Margin', '0 0 2rem');
    const dataEmptyText = text('Data empty text', 'There are no results to display');
    const borders = boolean('Borders', true);
    const error = boolean('Error', false);
    const errorMessage = text('Error message', 'Something went wrong getting your data!');
    const showHeader = boolean('Show header', true);
    const loading = boolean('Loading', false);
    const pager = boolean('Pager', true);
    const pagination = object('Pagination', {
      perPage: 24,
      page: 3,
      pages: 13,
      total: 300
    });
    const columns = object('Columns', [
      { label: 'Column 1', dataKey: 'column_1', minWidth: '200px' },
      { label: 'Column 2', dataKey: 'column_2', minWidth: '200px' },
      { label: 'Column 3', dataKey: 'column_3', minWidth: '200px' }
    ]);
    const data = object('Data', [
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' }
    ]);
    return (
      <Table
        borders={ borders }
        columns={ columns }
        data={ data }
        dataEmptyText={ dataEmptyText }
        error={ error }
        errorMessage={ errorMessage }
        loading={ loading }
        margin={ margin }
        pager={ pager }
        pagination={ pagination }
        pageChange={ (page) => alert(`Change to page => ${ page }`) }
        retryAction={ () => alert('retry') }
        showHeader={ showHeader }
        width={ width }
      />
    );
  }), { notes: README }
);


stories.add(
  'Actions',
  (() => {
    const margin = text('Width', '100%');
    const width = text('Margin', '0 0 2rem');
    const dataEmptyText = text('Data empty text', 'There are no results to display');
    const borders = boolean('Borders', true);
    const error = boolean('Error', false);
    const errorMessage = text('Error message', 'Something went wrong getting your data!');
    const loading = boolean('Loading', false);
    const showHeader = boolean('Show header', true);
    const columns = object('Columns', [
      { label: 'Column 1', dataKey: 'column_1', minWidth: '200px' },
      { label: 'Column 2', dataKey: 'column_2', minWidth: '200px' },
      { label: 'Column 3', dataKey: 'column_3', minWidth: '200px' }
    ]);
    const data = object('Data', [
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
      { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' }
    ]);
    const inlineMenu = (row) => (
      <FlyOut context='table'>
        <FlyOutButton title='Title' onClick={ () => alert(row.column_1) } icon='sync' />
        <FlyOutLink title='Title' link={ `/${ row.column_1 }` } icon='dashboard' />
      </FlyOut>
    );
    return (
      <Table
        borders={ borders }
        columns={ columns }
        data={ data }
        dataEmptyText={ dataEmptyText }
        error={ error }
        errorMessage={ errorMessage }
        loading={ loading }
        margin={ margin }
        showHeader={ showHeader }
        width={ width }
        actions={ inlineMenu }
      />
    );
  }), { notes: README }
);

// STATE
const store = new Store({
  sorting: { direction: 'desc', dataKey: 'column_1' },
  data: [
    { 'column_1': '1', 'column_2': '4', 'column_3': '7' },
    { 'column_1': '2', 'column_2': '5', 'column_3': '8' },
    { 'column_1': '3', 'column_2': '6', 'column_3': '9' }
  ]
});

stories.add(
  'Sorting',
  (() => {
    const margin = text('Width', '100%');
    const width = text('Margin', '0 0 2rem');
    const dataEmptyText = text('Data empty text', 'There are no results to display');
    const borders = boolean('Borders', true);
    const error = boolean('Error', false);
    const errorMessage = text('Error message', 'Something went wrong getting your data!');
    const loading = boolean('Loading', false);
    const showHeader = boolean('Show header', true);
    const columns = object('Columns', [
      { label: 'Column 1', dataKey: 'column_1', minWidth: '200px', sortable: true },
      { label: 'Column 2', dataKey: 'column_2', minWidth: '200px', sortable: true },
      { label: 'Column 3', dataKey: 'column_3', minWidth: '200px' }
    ]);

    return (
      <RenderWithProps store={ store }>
        <Table
          borders={ borders }
          columns={ columns }
          sorting={ store.state.storing }
          onSort={ (sorting) => {
            const { dataKey, direction } = sorting;
            const data = get(store, 'state.data', []);
            
            const sortedData = data.sort((a, b) => {
              const comparison = get(a, dataKey, '').localeCompare(get(b, dataKey, ''));
              return direction === 'desc' ? -comparison : comparison;
            });

            console.log(sortedData);

            store.set({ sorting, data });
          } }
          data={ store.state.data }
          dataEmptyText={ dataEmptyText }
          error={ error }
          errorMessage={ errorMessage }
          loading={ loading }
          margin={ margin }
          showHeader={ showHeader }
          width={ width }
        />
      </RenderWithProps>
    );
  }), { info: { propTablesExclude: [RenderWithProps] }, notes: README }
);