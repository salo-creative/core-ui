import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { filter } from 'lodash';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { TypeAhead } from '../../index';

// README
import README from './README.md';

const stories = storiesOf('Forms | TypeAhead', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['typeahead'] });

stories.add(
  'Basic',
  (() => {
    // STORE
    const store = new Store({ value: '', suggestions: [] });
    // KNOBS
    const label = text('Label', 'TypeAhead label');
    const loading = boolean('Show loading state', false);
    const helperText = text('Helper text', 'Helper text');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const suggestions = [
      { id: '1', label: 'Sales Adviser' },
      { id: '2', label: 'System Admin' },
      { id: '3', label: 'Organisation Admin' },
      { id: '4', label: 'Marketing' },
      { id: '5', label: 'Client' },
      { id: '6', label: 'Provider' }
    ];

    return (
      <State store={ store }>
        { state => (
          <TypeAhead
            onChange={ ({ value }) => {
              let newSuggestions = [];
              if (value) {
                newSuggestions = filter(suggestions, (suggestion) => {
                  return suggestion.label.toLowerCase().includes(value.toLowerCase());
                });
              }
              store.set({ suggestions: newSuggestions });
            } }
            label={ label }
            loading={ loading }
            helperText={ helperText }
            error={ error }
            required={ required }
            disabled={ disabled }
            suggestions={ state.suggestions }
            name='story'
          />
        ) }
      </State>
    );
  }),
  {
    info: { propTablesExclude: [State] },
    notes: README
  }
);