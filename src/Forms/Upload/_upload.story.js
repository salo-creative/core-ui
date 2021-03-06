import React from 'react';
import {
  withKnobs, boolean, text, select
} from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Upload } from '../../index';

// README //
import README from './README.md';

// ADDITIONAL COMPONENTS
import P from '../../Typography/P';

// Start of story logic
export const Basic = () => {
  // STORE
  const store = new Store({
    value: ''
  });
  // KNOBS
  const label = text('Label', 'Input label');
  const helperText = text('Helper text', 'Helper text');
  const fontSize = text('Font size', '1.4rem');
  const error = boolean('Show error state', false);
  const required = boolean('Required field', false);
  const disabled = boolean('Show disabled state', false);
  const accept = select('accept', {
    all: '*',
    documents: ['documents'],
    images: ['images'],
    data: ['data'],
    imagesAndData: ['images', 'data']
  });
  return (
    <RenderWithProps store={ store }>
      <Upload
        name='story'
        disabled={ disabled }
        error={ error }
        fontSize={ fontSize }
        label={ label }
        required={ required }
        helperText={ helperText }
        accept={ accept }
        onChange={ ({ e }) => store.set({
          value: e.target.files[0]
        }) }
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
    jest: ['upload'],
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export const Custom = () => {
  // STORE
  const store = new Store({
    value: ''
  });
  // KNOBS
  const label = text('Label', 'Input label');
  const helperText = text('Helper text', 'Helper text');
  const fontSize = text('Font size', '1.4rem');
  const error = boolean('Show error state', false);
  const required = boolean('Required field', false);
  const disabled = boolean('Show disabled state', false);
  const accept = select('accept', {
    all: '*',
    documents: ['documents'],
    images: ['images'],
    data: ['data'],
    imagesAndData: ['images', 'data']
  });
  return (
    <RenderWithProps store={ store }>
      <Upload
        name='story'
        disabled={ disabled }
        error={ error }
        fontSize={ fontSize }
        label={ label }
        required={ required }
        showLabel={ false }
        helperText={ helperText }
        accept={ accept }
        onChange={ ({ e }) => store.set({
          value: e.target.files[0]
        }) }
      >
        <P>Upload a file (pdf, docx, jpg, png)</P>
      </Upload>
    </RenderWithProps>
  );
};

Custom.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};

export const CustomProps = () => {
  // STORE
  const store = new Store({
    value: ''
  });
  // KNOBS
  const label = text('Label', 'Input label');
  const helperText = text('Helper text', 'Helper text');
  const fontSize = text('Font size', '1.4rem');
  const error = boolean('Show error state', false);
  const required = boolean('Required field', false);
  const disabled = boolean('Show disabled state', false);
  const accept = select('accept', {
    all: '*',
    documents: ['documents'],
    images: ['images'],
    data: ['data'],
    imagesAndData: ['images', 'data']
  });
  return (
    <RenderWithProps store={ store }>
      <Upload
        name='story'
        disabled={ disabled }
        error={ error }
        fontSize={ fontSize }
        label={ label }
        required={ required }
        helperText={ helperText }
        accept={ accept }
        onChange={ ({ e }) => store.set({
          value: e.target.files[0]
        }) }
      >
        { ({ inputRef }) => {
          return (
            <React.Fragment>
              <P>Upload a file (pdf, docx, jpg, png)</P>
              <button
                type='button'
                htmlFor='story'
                disabled={ disabled }
                onClick={ () => inputRef.current.click() }
              >
                Choose file
              </button>
            </React.Fragment>
          );
        } }
      </Upload>
    </RenderWithProps>
  );
};

CustomProps.story = {
  name: 'Custom props',
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    info: {
      propTablesExclude: [RenderWithProps]
    },
    notes: README
  }
};


export default {
  title: 'Forms/Upload'
};