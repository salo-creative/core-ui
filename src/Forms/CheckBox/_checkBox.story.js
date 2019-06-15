import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Components.
import { CheckBox, CheckBoxGroup } from '../../index';

// README
import README from './README.md';
import README_GROUP from './README_GROUP.md';

// Story logic.
const stories = storiesOf('Forms | CheckBox', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['checkbox'] });

stories.add(
  'Basic',
  (() => {
    // Store.
    const store = new Store({ checked: false });
    // Knobs.
    const label = text('Label', 'Checkbox label');
    const helperText = text('Helper text', 'Helper text');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const size = select('size', ['L', 'M'], 'M');
    return (
      <RenderWithProps store={ store }>
        <CheckBox
          checked={ store.checked }
          disabled={ disabled }
          error={ error }
          helperText={ helperText }
          label={ label }
          name='story'
          onChange={ e => store.set({ checked: e.checked }) }
          required={ required }
          size={ size }
        />
      </RenderWithProps>
    );
  }),
  {
    info: { propTablesExclude: [RenderWithProps] },
    notes: README
  }
);

stories.add(
  'Group',
  (() => {
    // Store.
    const store = new Store({
      fields: [
        { name: 'field_1', checked: false, label: 'Field 1' },
        { name: 'field_2', checked: false, label: 'Field 2' },
        { name: 'field_3', checked: false, label: 'Field 3' }
      ]
    });
    // Knobs.
    const label = text('Label', 'Checkbox group label');
    const helperText = text('Helper text', 'Helper text');
    const error = boolean('Show error state', false);
    const required = boolean('Required field', false);
    const disabled = boolean('Show disabled state', false);
    const singleSelect = boolean('Single select', false);
    const size = select('size', ['L', 'M'], 'M');
    return (
      <RenderWithProps store={ store }>
        <CheckBoxGroup
          disabled={ disabled }
          error={ error }
          fields={ store.fields }
          helperText={ helperText }
          label={ label }
          name='story'
          onChange={ fields => store.set({ fields }) }
          required={ required }
          singleSelect={ singleSelect }
          size={ size }
        />
      </RenderWithProps>
    );
  }),
  {
    info: { propTablesExclude: [RenderWithProps] },
    notes: README_GROUP
  }
);