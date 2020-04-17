import React from 'react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

// load tests
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { Editor } from '../../index';

// README //
import README from './README.md';

// Start of story logic
export const Basic = () => {
  const limit = number('Character limit', 300);
  const value = text(
    'Text',
    '<p>Hello, we are <a href="https://salocreative.co.uk">Salo Creative</a>.</p>'
  );
  const placeholder = text('Placeholder', 'some \n\rmultiline text');

  return (
    <Editor
      placeholder={ placeholder }
      value={ value }
      onExport={ output => console.log(output) }
      limit={ limit }
    />
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
    jest: ['editor'],
    notes: README,
    knobs: {
      escapeHTML: false
    }
  }
};

export default {
  title: 'Molecules/Editor'
};